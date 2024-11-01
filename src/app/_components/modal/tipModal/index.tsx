"use client";

import { Dispatch, SetStateAction } from "react";
import Link from "next/link";

import styled from "./styles.module.scss";

export function TipModal({
  setShowModal,
}: {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) {
  const handleShowModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styled.tip_modal}>
      <div className={styled.modal_background}>
        <div className={styled.modal}>
          <div className={styled.modal_header}>
            <div className={styled.circle_1}>1</div>
          </div>
          <div className={styled.modal_title}>
            <div>작성 꿀팁</div>
            <h3>
              수업명은 파악하기 쉽게
              <br />
              고유 정보로 입력하는게 좋아요
            </h3>
          </div>
          <div className={styled.tip_modal_footer}>
            <div className={styled.button_wrapper}>
              <Link href={{ pathname: `/schedule/add` }}>
                <button
                  className={`${styled.select_button} ${styled.active}`}
                  onClick={handleShowModal}
                >
                  확인
                </button>
              </Link>
            </div>
            <div className={styled.button_wrapper}>
              <Link href={{ pathname: `/schedule/add` }}>
                <button
                  className={styled.select_button}
                  onClick={handleShowModal}
                >
                  건너뛰기
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
