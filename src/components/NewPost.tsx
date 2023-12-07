"use client";
import { AuthUser } from "@/model/User";
import React, { useRef, useState } from "react";
import PostUserAvatar from "./PostUserAvatar";
import FilesIcon from "./ui/FilesIcon";
import Button from "./ui/Button";
import useDebounce from "@/hook/useDebounce";
import Image from "next/image";
import { FaClosedCaptioning } from "react-icons/fa";
import { useRouter } from "next/navigation";
import GirdSpinner from "./ui/GirdSpinner";

type Props = {
  user: AuthUser;
};

export default function NewPost({ user: { username, image } }: Props) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>(); // 즉각적인 타입할당
  const textRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // console.log(e.target?.files);
    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
      //   console.log(files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLLabelElement>) => {
    if (e.type === "dragenter") {
      setDragging(true);
    } else if (e.type === "dragleave") {
      setDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault(); // 파일을 드랍핑 하면 브라우저 내부에서 해당 파일을 열려고 하는 기본 속성이 있기 때문에 방지
    // console.log("드래그 오버 호출");
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    // console.log(e.dataTransfer, "e.dataTransfer");
    setDragging(false);
    const files = e.dataTransfer?.files;
    if (files && files[0]) {
      setFile(files[0]);
      //   console.log(files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("text", textRef.current?.value ?? "");

    fetch("/api/posts", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          setError(`${res.status} ${res.statusText}`);
          return;
        }
        router.push("/");
      })
      .catch((err) => setError(err.toString()))
      .finally(() => setLoading(false));
  };
  // textArea에 들어가서 text에 관한 상태값을 받아서 추가해줘야하지만 . useState 를 통해서 받게 되면 입력할 때마다 값이 바뀌므로 리렌더링이 계속 일어나서
  // 이미지의 깜빡임이 일어남. 그로 인해 레프를 쓰겠다.
  return (
    <section className="w-full max-w-xl flex flex-col items-center mt-6">
      {loading && (
        <div className="absolute inset-0 z-20 text-center pt-[30%] bg-sky-500/20">
          <GirdSpinner />
        </div>
      )}
      {error && (
        <p className="w-full bg-red-100 text-red-600 text-center p-4 mb-4 font-bold">
          {error}
        </p>
      )}
      <PostUserAvatar username={username} image={image ?? ""} />
      <form className="w-full flex flex-col mt-2" onSubmit={handleSubmit}>
        <input
          className="hidden"
          name="input"
          id="input-upload"
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
        {/* accept="image/*" 어떤 이미지던지 받아올거임 */}
        <label
          className={`w-full h-60 flex flex-col items-center justify-center ${
            !file && "border-2 border-sky-500 border-dashed"
          }`}
          htmlFor="input-upload"
          onDragEnter={handleDrag} // 사용자가 이미지를 가지고 해당 레이블까지 가지고 오면 발생
          onDragLeave={handleDrag} // 이미지를 밖으로 가지고 나가면 발생
          onDragOver={handleDragOver} //
          onDrop={handleDrop} // 사용자가 마우스놔서 드랍핑 되면 발생
        >
          {dragging && (
            <div className="absolute inset-0 z-10 bg-sky-500/20 pointer-events-none"></div>
          )}
          {!file && (
            <div className="flex flex-col items-center pointer-events-none">
              <FilesIcon />
              <p>Drag and Drop your image here or click</p>
            </div>
          )}
          {file && (
            <div className="relative w-full aspect-square">
              <Image
                className="object-cover"
                src={URL.createObjectURL(file)}
                alt="local file"
                fill
                sizes="650px"
              />
            </div>
          )}
        </label>
        <textarea
          className="outline-none text-lg border border-neutral-300"
          name="text"
          id="input-text"
          required
          rows={10}
          placeholder={"Write a caption.."}
          ref={textRef}
        />
        <Button text="Publish" onClick={() => {}} />
      </form>
    </section>
  );
}
