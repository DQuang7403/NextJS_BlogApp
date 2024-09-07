import { IKUpload, ImageKitProvider } from "imagekitio-next";
import { FileImage } from "lucide-react";
import React from "react";
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

const authenticator = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/auth/upload-image");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`,
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error}`);
  }
};

const onError = (err: any) => {
  console.log("Error", err);
};
export default function UploadImage({ setImageURL, setProgress }: any) {
  return (
    <ImageKitProvider
      urlEndpoint={urlEndpoint}
      publicKey={publicKey}
      authenticator={authenticator}
    >
      <IKUpload
        useUniqueFileName
        onError={onError}
        onSuccess={(res) => {
          setProgress(false);
          setImageURL(res.url);
        }}
        onUploadProgress={(progress) => {
          setProgress(true);
          console.log(progress);
        }}
        id="image"
        style={{ display: "none" }}
      />
      <label
        htmlFor="image"
        style={{
          cursor: "pointer",
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          border: "1px solid var(--text-color)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FileImage color={"var(--text-color)"} />
      </label>
    </ImageKitProvider>
  );
}
