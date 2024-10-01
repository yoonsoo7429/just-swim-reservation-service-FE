"use client";

import {
  ChangeEvent,
  ForwardedRef,
  InputHTMLAttributes,
  MouseEvent,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";

import { FileInputProps } from "@types";
import { mergeRefs, randomId } from "@utils";
import { ConfirmModal, ImageCarousel } from "@components";
import { IconCancelWhite } from "@assets";

import styled from "./styles.module.scss";
import { useModal } from "@hooks";

function _FileInput(
  {
    name,
    size = 20,
    id = "fileInput",
    onChange = (event: ChangeEvent<HTMLInputElement>) => {},
    // @ts-ignore
    setValue,
    // @ts-ignore
    errors = [],
    ...props
  }: FileInputProps &
    InputHTMLAttributes<HTMLInputElement> & {
      onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    },
  ref: ForwardedRef<HTMLInputElement>
) {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const onChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;

    if (!files || files.length === 0) {
      alert("파일을 추가해주세요.");
      return;
    }

    const file = files[0];

    if (!file.type.startsWith("image")) {
      alert("이미지 파일만 추가할 수 있습니다.");
      return;
    }

    if (file.size > size * 1024 * 1024) {
      alert(`${size}MB 이하의 파일만 업로드할 수 있습니다.`);
      return;
    }

    setUploadedImage(file);

    const store = new DataTransfer();
    store.items.add(file);
    if (inputRef.current) {
      inputRef.current.files = store.files;
    }
  };

  const deleteUploadedImage = () => {
    setUploadedImage(null);

    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.dispatchEvent(new Event("change", { bubbles: true }));
    }
  };

  useEffect(() => {
    if (uploadedImage) {
      setPreviewImage(URL.createObjectURL(uploadedImage));
      setValue(name, uploadedImage);
    } else {
      setPreviewImage(null);
    }
  }, [uploadedImage, setValue]);

  const { modal, setModal, showModal, hideModal } = useModal();

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeImage(event);
    onChange(event);
  };

  return (
    <>
      <div className={styled.input_wrapper}>
        <div className={styled.preview_wrapper}>
          {previewImage && (
            <div
              className={styled.preview_item}
              style={{
                backgroundImage: `url(${previewImage})`,
              }}
              onClick={(event: MouseEvent<HTMLDivElement>) => {
                event.preventDefault();
                showModal();
              }}
            >
              <button
                className={styled.delete_button}
                onClick={(event: MouseEvent<HTMLButtonElement>) => {
                  event.stopPropagation();
                  event.preventDefault();
                  deleteUploadedImage();
                }}
              >
                <IconCancelWhite width={14} height={14} />
              </button>
            </div>
          )}
        </div>
        <label htmlFor={id} className={styled.add_label}>
          <span>+</span>
        </label>

        <input
          {...props}
          name={name}
          id={id}
          ref={mergeRefs(inputRef, ref)}
          type="file"
          hidden
          readOnly
          onChange={handleOnChange}
        />
        {modal && previewImage && (
          <ImageCarousel
            images={[previewImage]}
            index={0}
            setIndex={() => {}}
            useDeleteButton={true}
            deleteImage={deleteUploadedImage}
            hideModal={hideModal}
          />
        )}
      </div>
    </>
  );
}

export const FileInput = forwardRef(_FileInput);
