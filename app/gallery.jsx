import { Link } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isViewerVisible, setIsViewerVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fetch images from backend
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          "https://yourbeirut.tech:3002/api/chat/getUserImages?chatTag=3"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);

        // Extract image URLs from the response, supporting both .jpeg and .jpg
        const imageUrls = data
          .filter(
            (item) =>
              item.message &&
              (item.message.toLowerCase().endsWith(".jpeg") ||
                item.message.toLowerCase().endsWith(".jpg"))
          ) // Filter for JPEG and JPG images
          .map((item) => ({ url: item.message }));
        console.log("Extracted Image URLs:", imageUrls);

        setImages(imageUrls);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching images:", err);
        setError("Failed to fetch images.");
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  // Open the image viewer
  const openImageViewer = (index) => {
    setCurrentImageIndex(index);
    setIsViewerVisible(true);
  };

  // Render individual image item
  const renderImageItem = ({ item, index }) => {
    console.log("Rendering Image URL:", item.url); // Log the image URL
    return (
      <TouchableOpacity onPress={() => openImageViewer(index)}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.url }}
            style={{ width: 100, height: 100, backgroundColor: "red" }} // Fixed dimensions with debug background
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Link href="/chat" style={styles.backButton}>
        <Text style={styles.backButtonText}>←</Text>
      </Link>
      <Text style={styles.title}>Gallery</Text>
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : images.length === 0 ? (
        <Text style={styles.errorText}>No images available</Text>
      ) : (
        <FlatList
          data={images}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderImageItem}
          numColumns={3} // Display images in a grid
          contentContainerStyle={styles.galleryContainer}
        />
      )}

      {/* Image Viewer Modal */}
      <Modal
        visible={isViewerVisible}
        transparent={true}
        onRequestClose={() => setIsViewerVisible(false)}
      >
        <ImageViewer
          imageUrls={images}
          index={currentImageIndex}
          onSwipeDown={() => setIsViewerVisible(false)}
          enableSwipeDown={true} // Allow swiping down to close
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 10,
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
  },
  backButtonText: {
    color: "#FFF",
    fontSize: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 20,
    textAlign: "center",
  },
  loadingText: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  galleryContainer: {
    justifyContent: "flex-start",
    paddingBottom: 20,
  },
  imageContainer: {
    flex: 1,
    margin: 18,
    padding: 10,
    aspectRatio: 1, // Ensure square images
    backgroundColor: "#000", // Keep background black
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 15,
  },
});
