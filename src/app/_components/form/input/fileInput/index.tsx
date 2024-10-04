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
import { mergeRefs } from "@utils";
import { ImageCarousel } from "@components";
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

    // 파일이 선택되지 않았을 경우 경고 메시지
    if (!files || files.length === 0) {
      alert("파일을 추가해주세요.");
      return;
    }

    const file = files[0]; // 첫 번째 파일만 처리

    // 이미지 파일 여부 확인
    if (!file.type.startsWith("image")) {
      alert("이미지 파일만 추가할 수 있습니다.");
      return;
    }

    // 파일 크기 확인
    if (file.size > size * 1024 * 1024) {
      alert(`${size}MB 이하의 파일만 업로드할 수 있습니다.`);
      return;
    }

    // 이미지를 상태에 저장
    setUploadedImage(file);

    // 파일 input에 파일 추가
    const store = new DataTransfer();
    store.items.add(file);
    if (inputRef.current) {
      inputRef.current.files = store.files;
    }
  };

  const deleteUploadedImage = () => {
    if (uploadedImage) {
      URL.revokeObjectURL(previewImage!);
    }
    setUploadedImage(null);

    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.dispatchEvent(new Event("change", { bubbles: true }));
    }
  };

  useEffect(() => {
    if (uploadedImage) {
      const newPreviewImage = URL.createObjectURL(uploadedImage);
      setPreviewImage(newPreviewImage);
      if (setValue) {
        setValue(name, uploadedImage);
      }
      // 컴포넌트가 언마운트 될 때 URL 해제
      return () => URL.revokeObjectURL(newPreviewImage);
    } else {
      setPreviewImage(null);
    }
  }, [uploadedImage, setValue]);

  const { modal, hideModal } = useModal();

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeImage(event);
    onChange(event);
  };

  return (
    <>
      <div className={styled.input_wrapper}>
        <div className={styled.preview_wrapper}>
          {previewImage ? (
            <div
              className={styled.preview_item}
              style={{
                backgroundImage: `url(${previewImage})`,
              }}
              onClick={(event: MouseEvent<HTMLDivElement>) => {
                event.preventDefault();
                if (inputRef.current) {
                  inputRef.current.click(); // 이미지 클릭 시 파일 선택 창 열기
                }
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
          ) : (
            <label htmlFor={id} className={styled.add_label}>
              <span>+</span>
            </label>
          )}
        </div>
        <input
          {...props}
          name={name}
          id={id}
          ref={mergeRefs(inputRef, ref)}
          type="file"
          hidden
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
