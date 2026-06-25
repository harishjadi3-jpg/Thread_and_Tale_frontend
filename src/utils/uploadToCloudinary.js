const uploadToCloudinary =
async(file)=>{

    const cloudName =
    import.meta.env
    .VITE_CLOUDINARY_NAME;

    const uploadPreset =
    import.meta.env
    .VITE_CLOUDINARY_PRESET;

    const formData =
    new FormData();

    formData.append(
        "file",
        file
    );

    formData.append(
        "upload_preset",
        uploadPreset
    );

    const response =
    await fetch(

        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,

        {
            method:"POST",

            body:formData
        }
    );

    const data =
    await response.json();

    return data.secure_url;
};

export default uploadToCloudinary;