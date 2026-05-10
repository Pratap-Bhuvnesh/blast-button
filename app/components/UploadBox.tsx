"use client";

import { useRef, useState } from "react";
import { uploadSound } from "@/lib/upload";

export default function UploadBox() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  function clearMessages() {
    setTimeout(() => {
      setSuccess("");
      setError("");
    }, 5000); 
  }

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    // reset old messages
    setSuccess("");
    setError("");

    // validation
    if (file.size > 5 * 1024 * 1024) {
      setError("❌ File size must be under 5MB.");

      clearMessages();

      // remove filename from input
      if (inputRef.current) {
        inputRef.current.value = "";
      }

      return;
    }

    try {
      setLoading(true);

      const url = await uploadSound(file);

      if (!url) {
        throw new Error("Upload failed");
      }

      setSuccess("✅ Sound uploaded successfully!");

      clearMessages();

    } catch (err) {
      console.error(err);

      setError("❌ Failed to upload sound.");

      clearMessages();

    } finally {
      setLoading(false);

      // ALWAYS clear selected filename
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  return (
    <div className="space-y-4 rounded-2xl border border-white/10 bg-zinc-900">
      {/* Hidden Input */}
      <input
        ref={inputRef}
        type="file"
        accept="audio/*"
        onChange={handleUpload}
        className="hidden"
        id="audio-upload"
      />

      {/* Custom Upload Button */}
      <label
        htmlFor="audio-upload" className="rounded-xl bg-violet-600 px-4 py-3 font-medium transition"
      >
        Upload
      </label>

      {/* Loading */}
      {loading && (
        <div className="rounded-xl bg-blue-500/10 p-3 text-sm text-blue-400">
          ⏳ Uploading sound...
        </div>
      )}

      {/* Success */}
      {success && (
        <div className="rounded-xl bg-green-500/10 p-3 text-sm text-green-400">
          {success}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-xl bg-red-500/10 p-3 text-sm text-red-400">
          {error}
        </div>
      )}
    </div>
  );
}