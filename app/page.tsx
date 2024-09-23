"use client";
import React, { useState } from "react";

export default function Home() {
  const [file, setFile]: any = useState(null);
  const [fileName, setFileName] = useState("Choose File");

  const onFileChange = (e: any) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (file == null) {
      alert("No file found");
      return;
    }

    try {
      var headers = new Headers();
      // headers.append("Accept ", "application/json");
      headers.append("Content-Type", "application/json");
      const formData = new FormData();
      formData.append("file", file);

      const data = await fetch("/api/file-uploading", {
        method: "POST",
        body: formData,
      }).then((res) => res.json());
      alert("File uploaded successfully");
    } catch (err) {
      alert("File upload failed");
      console.log(err);
    }
  };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <form onSubmit={onSubmit}>
          <div className="custom-file mb-4">
            <input
              type="file"
              className="custom-file-input"
              id="customFile"
              onChange={(e) => onFileChange(e)}
            />
            <label className="custom-file-label" htmlFor="customFile">
              {fileName}
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Upload
          </button>
        </form>
      </main>
    </div>
  );
}
