import styled from "@emotion/styled";
import { mq } from "ComponentsFarm/common";
import Dialog from "ComponentsFarm/common/Dialog";
import Modal from "ComponentsFarm/common/Modal";
import DOMPurify from "isomorphic-dompurify";
import { useCallback, useState } from "react";
import { PrivacyArr } from "./PrivacyContent";

function Privacy({ open, close }: any) {
  return (
    <Modal open={open} onClose={close}>
      <PrivacyWrap>
        <p className="tit">{PrivacyArr[0].title}</p>
        <div className="box_info">
          <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(PrivacyArr[0].txt) }} />
        </div>
        <button className="btn_close" onClick={close}>
          <span className="hiddenZoneV">닫기</span>
        </button>
      </PrivacyWrap>
    </Modal>
  );
}

export default Privacy;

export const PrivacyWrap = styled.div`
  position: relative;
  width: 90%;
  max-width: 132rem;
  padding: 6.4rem 0 6.6rem;
  border-radius: 3rem;
  background: #fff;

  .box_info {
    overflow-y: scroll;
    width: 95%;
    height: 57.8rem;
    margin: 5.6rem auto 0;
    padding-right: 4.5rem;
    font-size: 1.6rem;
  }

  ${mq[0]} {
    width: calc(100vw - 40px);
    height: 438px;
    padding: 30px 0;
    border-radius: 10px;

    .tit {
      margin: 0 0 21px !important;
      font-size: 27px !important;
    }
    .box_info {
      overflow-y: auto;
      width: 100%;
      max-height: calc(100% - 60px);
      height: auto;
      margin: 0 auto;
      padding: 0 30px;
      font-size: 12px;
    }
  }
`;
