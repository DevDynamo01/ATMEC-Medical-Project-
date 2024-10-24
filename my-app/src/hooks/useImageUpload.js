import React, { useState, useContext } from "react";
import DataContext from "../context/dataContext";

const useImageUpload = () => {
    const [url, setUrl] = useState("");
    const {setLoadingChat}=useContext(DataContext)
    const uploadImage = async (image) => {
        setLoadingChat(true);
        const data = new FormData();
        data.append("file", image);
        data.append(
            "upload_preset",
            process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
          );
        data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
        data.append("folder", "MedGen-AI");

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: data,
                }
            );
            const res = await response.json();
            console.log("This is image url in useImageUpload",res.secure_url)
            setLoadingChat(false);
            return res.secure_url;
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setLoadingChat(false);
        }
    };

    return {uploadImage };
};

export default useImageUpload;
