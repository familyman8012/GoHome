import React, { useEffect, useMemo, useState } from "react";
import { CSSTransition } from "react-transition-group";
import styled from "@emotion/styled";
import { Portal } from "./Portal";
import { mq } from "ComponentsFarm/common";
import { ApplicationWrap } from "ComponentsFarm/popup/Application";

interface IModal {
  open: boolean;
  className?: string;
  onClose: () => void;
  children: React.ReactNode;
  center?: boolean;
}

export function Modal({ open, onClose, children, center, className = "" }: IModal): React.ReactElement | null {
  const portalId = useMemo(() => `modalArea_${Math.random().toString(36).substr(2, 16)}`, []);
  const [container, setContainer] = useState<Element | null>(null);

  // 추가된 useEffect
  useEffect(() => {
    if (open) {
      document.body.classList.add("overflowhidden");
    } else {
      document.body.classList.remove("overflowhidden");
    }
  }, [open]);

  useEffect(() => {
    // 자체적으로 container 생성
    const newContainer = document.createElement("div");
    newContainer.setAttribute("id", portalId);
    document.body.appendChild(newContainer);
    //overflowhidden
    // document.body.classList.add("overflowhidden");

    // trigger rerender
    setContainer(newContainer);

    // container 제거
    return () => {
      const containerDOM = document.getElementById(portalId);
      containerDOM?.remove();
    };
  }, [portalId]);

  const handleEndEventListener = React.useCallback((node: HTMLElement, done: () => void) => node.addEventListener("transitionend", done, false), []);

  return (
    <Portal container={container}>
      <CSSTransition in={open} mountOnEnter unmountOnExit addEndListener={handleEndEventListener} classNames="transition">
        <ModalWrapper center={center} className={className}>
          <div className="dimm" onClick={onClose} />
          <div className="modal-dialog">
            <div className="modal-content">{children}</div>
          </div>
        </ModalWrapper>
      </CSSTransition>
    </Portal>
  );
}

export const ModalHeader = ({ children, closeButton }: { children: React.ReactNode; closeButton?: () => void }) => {
  return (
    <ModalHead>
      {children}
      {closeButton && <button type="button" className="btn-close" onClick={closeButton} aria-label="Close" />}
    </ModalHead>
  );
};

export const ModalHead = styled.div<{ closeButton?: boolean }>`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1rem;
  border-bottom: 1px solid #dee2e6;
  border-top-left-radius: calc(0.3rem - 1px);
  border-top-right-radius: calc(0.3rem - 1px);

  .btn-close {
    box-sizing: content-box;
    width: 1em;
    height: 1em;
    padding: 0.25em 0.25em;
    color: #000;
    background: url("https://dev-gopizza-homepage.s3.ap-northeast-2.amazonaws.com/ui/images/btn_close.svg") no-repeat center/1em auto;
    border: 0;
    border-radius: 0.25rem;
    opacity: 0.5;
    padding: 0.5rem 0.5rem;
    margin: -0.5rem -0.5rem -0.5rem auto;
    cursor: pointer;
    -webkit-appearance: button;
  }
`;

export const ModalBody = styled.div`
  position: relative;
  flex: 1 1 auto;
  padding: 1rem;
`;

export const ModalFooter = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-shrink: 0;
  align-items: center;
  justify-content: flex-end;
  padding: 0.75rem;
  border-top: 1px solid #dee2e6;
  border-bottom-right-radius: calc(0.3rem - 1px);
  border-bottom-left-radius: calc(0.3rem - 1px);

  &.fullWidth {
    padding: 0;
    border-top: 0;
  }
`;

const ModalWrapper = styled.div<{ center?: boolean }>`
  position: fixed;
  z-index: 1050;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  .btn_close {
    position: absolute;
    top: 0;
    right: -10.5rem;
    width: 8rem;
    height: 8rem;
    cursor: pointer;
    background: url("https://dev-gopizza-homepage.s3.ap-northeast-2.amazonaws.com/ui/images/popup/btn_close.webp") no-repeat left top / 100%;
  }

  p.tit {
    margin: 0.8rem 0 3.8rem;
    font-size: 4rem;
    font-weight: bold;
    color: var(--color-orange);
    text-align: center;
  }

  @media (max-width: 550px) {
    p.tit {
      font-size: 18px;
    }
    .box_info p {
      font-size: 12px;
    }
  }

  @keyframes dimmOpacity {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @keyframes modalFade {
    from {
      transform: translate(0, -50px);
    }

    to {
      transform: none;
    }
  }

  @keyframes centerModalFade {
    from {
      transform: translate(0, -70%);
    }

    to {
      transform: translate(0, -50%);
    }
  }

  .dimm {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
  }

  .modal-dialog {
    margin: 1.75rem auto;

    ${mq[0]} {
      ${ApplicationWrap} {
        width: 320px;
        padding: 5.8rem 0 5.3rem;

        .tit {
          font-size: 24px;
        }
        .txt_success {
          font-size: 13px;
          margin: 10px 0;
        }
        .txt_notice {
          font-size: 11px;
          margin-bottom: 25px;
        }
        .btn_agree {
          width: 300px;
          height: 40px;
          font-size: 13px;
          border-radius: 40px;
        }
        .btn_close {
          top: auto;
          bottom: -55px;
          width: 40px;
          height: 40px;
        }
      }
    }

    ${({ center }) =>
      center &&
      `
    top: 50%;
    left: 0;
    right: 0;
    margin: 0 auto;
    position: absolute;`}
  }
  /* .modal-content {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    pointer-events: auto;
    background-color: #fff;
    background-clip: padding-box;
    border-radius: 0.3rem;
    outline: 0;
  } */
  .modal-body {
    position: relative;
    flex: 1 1 auto;
    padding: 1rem;
  }

  &.interior .modal-dialog {
    width: 267px;
    padding: 0;
    font-family: "Noto Sans KR";

    ${ModalHead} {
      padding: 24px 0 17px;
      justify-content: center;
      border-bottom: 0;

      h1 {
        margin-bottom: 0;
        font-size: 14px;
        font-weight: 700;
      }
    }

    .modal-content {
      border: 0;
      border-radius: 0.75rem;
      overflow: hidden;
    }
  }

  ${ModalBody} {
    text-align: center;
    p {
      margin-bottom: 16px;
      font-size: 12px;
      font-weight: 500;
      line-height: 1;
    }
    textarea {
      width: 100%;
      height: 124px;
      margin-top: 12px;
      padding: 8px;
      font-size: 12px;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
    }
  }

  ${ModalFooter} {
    padding: 0;
    border-top: 0;

    button {
      margin: 0;
      height: 40px;
      font-size: 14px;
      font-weight: 400;
      border-top-left-radius: 0;
      border-top-right-radius: 0;

      &:disabled {
        color: #e0e0e0 !important;
        background: #bdbdbd !important;
      }
    }
  }

  // transitions
  &.transition {
    /** animation 활성화 transtision */
    &-exit-active,
    &-enter-active {
      transition: opacity 350ms;
      .modal-dialog {
        transition: transform 350ms;
      }
    }

    &-enter {
      opacity: 0;
      .modal-dialog {
        transform: translateY(-50px);
      }
    }

    &-enter-active {
      opacity: 1;
      .modal-dialog {
        transform: translateY(0);
      }
    }

    &-exit {
      opacity: 1;
      .modal-dialog {
        transform: translateY(0);
      }
    }

    &-exit-active {
      opacity: 0;
      .modal-dialog {
        transform: translateY(-50px);
      }
    }
  }
`;

export default Modal;
