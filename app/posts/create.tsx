import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import {
    FlatList,
    Image,
    Platform,
    ScrollView,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { StyleSheet, Text, View } from "react-native";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

export default function CreatePost({ setShowButton, setShowPost } : any) {

    const navigate = useNavigation();
  const [query, setQuery] = useState("");
  const [dropdownData, setDropdownData] = useState();
  const [showDropdown, setShowDropdown] = useState(false);


  const postformik = useFormik({
    initialValues: {
      name: null,
      content: "",
      images: [],
      employee: "",
      mentions: [],
      tags: [],
      search: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Title is required"),
      content: Yup.string().required("Description is required"),
      employee: Yup.string().required("Employee is required"),
    }),
    onSubmit: (values, formikHelpers) => {
      if (postformik.isValid) {
        console.log(postformik.values, "values");
      }
    },
  });

//   const handleSearch = async (text) => {
//     setQuery(text);

//     if (text) {
//       try {
//         const response = await GET(
//           `${apiEndpoints.employeeSearch}?query=${text}`,
//           {
//             headers: { Authorization: `Bearer ${accessToken}` }, // If needed
//           }
//         );

//         setDropdownData(response.data.users); // Update dropdown state
//         console.log(dropdownData, "dropdownData", response.data.users);
//         setShowDropdown(true);
//       } catch (error) {
//         console.error("Error fetching dropdown data:", error);
//       }
//     } else {
//       postformik.setFieldValue("employee", "");
//       setDropdownData([]);
//       setShowDropdown(false);
//     }
//   };

  const pickImage = async () => {
    // Request permission to access media
    // if (Platform.OS !== "web") {
    //   const { status } =
    //     await ImagePicker.requestMediaLibraryPermissionsAsync();
    //   if (status !== "granted") {
    //     alert("Sorry, we need permission to access your camera roll!");
    //     return;
    //   }
    // }

    // // Launch image picker
    // const result = await ImagePicker.launchImageLibraryAsync({
    //   mediaType: ImagePicker.MediaTypeOptions.Images,
    //   aspect: [4, 3],
    //   quality: 1,
    //   allowsMultipleSelection: true,
    // });

    // if (!result.canceled) {
    //   const selectedImages = result.assets.map((asset :any) => asset.uri); // Collect image URIs
    //   postformik.setFieldValue("images", selectedImages);
    // }
  };

  console.log(postformik.values.images, "images");

  return (
    <ScrollView>
      <View style={styles.postContainer}>
        <View style={styles.field}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            id="name"
            style={styles.textInput}
            // value={postformik.values.name}
            placeholder="Enter Post Title"
            onChangeText={postformik.handleChange("name")}
          />
          {postformik.touched.name && postformik.errors.name && (
            <Text style={styles.errorText}>{postformik.errors.name}</Text>
          )}
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Appreciate Employee</Text>

          <TextInput
            style={styles.textInput}
            placeholder="Search..."
            value={postformik.values.search}
            onChangeText={(text) => {
              // Update Formik's state
              // Dispatch action to update dropdown data
            //   handleSearch(text);
              postformik.setFieldValue("search", text);
            }}
          />
          {showDropdown && dropdownData && (
            <FlatList
              style={styles.dropdown}
              data={dropdownData}
              keyExtractor={(item) => item.id?.toString() || item.name}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItemContainer}
                  onPress={() => {
                    // Set the selected value in Formik and hide the dropdown
                    postformik.setFieldValue("search", item.name);
                    postformik.setFieldValue("employee", item.id);
                    setShowDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownItem}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          )}
          {postformik.touched.employee && postformik.errors.employee && (
            <Text style={styles.errorText}>{postformik.errors.employee}</Text>
          )}
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.textArea}
            multiline={true}
            id="content"
            value={postformik.values.content}
            onChangeText={postformik.handleChange("content")}
            placeholder="Write your post... Use @ to mention users and # for tags"
          />
          {postformik.touched.content && postformik.errors.content && (
            <Text style={styles.errorText}>{postformik.errors.content}</Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Upload Images</Text>
          <TouchableOpacity
            onPress={pickImage}
            style={{
              width: "auto",
              height: 200,
              backgroundColor: "#ddd",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              marginBottom: 10,
            }}
          >
            <Text style={{ color: "#333" }}>Select Images</Text>
          </TouchableOpacity>
          {postformik.values.images.length > 0 && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {postformik.values.images.map((imageUri, index) => (
                <Image
                  key={index}
                  source={{ uri: imageUri }}
                  style={{
                    width: 100,
                    height: 100,
                    marginRight: 10,
                    borderRadius: 10,
                  }}
                />
              ))}
            </ScrollView>
          )}
        </View>
        <View style={styles.buttonTextContainer}>
          <TouchableOpacity
            style={styles.createpostButton}
            onPress={() => {
              // setShowPost(false);
              // setShowButton(true);
            }}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.createpostButton}
            onPress={()=>{postformik.handleSubmit()}}
          >
            <Text style={styles.buttonText}>Create Post</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    padding: 10,
  },
  addContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  postButton: {
    backgroundColor: "purple",
    padding: 15,
    borderRadius: 10,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonTextContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    paddingRight: 10,
  },
  createpostButton: {
    backgroundColor: "#2B93E7",
    padding: 10,
    borderRadius: 10,
    width: 150,
    justifyContent: "space-between",
    alignItems: "center",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "grey",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  field: {
    gap: 10,
    marginBottom: 10,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "grey",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    height: 100,
    textAlignVertical: "top",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 5,
  },
  stickyButtons: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label:{
    fontSize: 16,
    fontWeight: "bold",
  }
});
