import React, { useEffect, useState } from "react";
import { Strong3Wrap, VideoWrap } from "./style";
import ReactPlayer from "react-player/lazy";

const StrongTxt = [
  {
    id: 1,
    tit: `1인 피자의
    독보적인 선두주자`,
    txt1: `모두가 생각만 하던 것을 
    실현해냈습니다.`,
    txt2: `혼자서도 부담없이 즐길 수 있는 
    1인 피자를 원하는 고객들이 
    가장 먼저 떠올리는 이름,
     ‘고피자’입니다.`,
  },
  {
    id: 2,
    tit: `쉽고 편리한
    오퍼레이션`,
    txt1: `세상에서 가장 쉬운 방법으로
    피자를 만듭니다.`,
    txt2: `피자 만드는 방법을 처음부터 끝까지 
    완전히 새롭게 혁신했습니다.
    점주의 수익성뿐만 아니라 워라밸까지 
    챙길 수 있는 고피자 오퍼레이션을 
    경험해보세요.`,
  },
  {
    id: 3,
    tit: `소자본 창업,
    고매출`,
    txt1: `13평에서 탄생하는
    9,000만원의 매출 신화!`,
    txt2: `홀매출과 배달매출,
    어느 쪽도 놓치지 않습니다.
    점주님과 함께 성장하고 
    매출을 높이기 위하여
    고피자는 고민을 거듭하고 
    최선을 다합니다.`,
  },
];

function Strong3() {
  //비디오
  const [winReady, setwinReady] = useState(false);
  const [play, setPlay] = useState(false);
  const handleToggle = (e: any) => {
    e.stopPropagation();
    setPlay((prev) => !prev);
  };
  useEffect(() => {
    setwinReady(true);
  }, []);
  //비디오

  return (
    <Strong3Wrap>
      <div className="video_wrap" style={{ marginTop: "-10.6rem" }}>
        <VideoWrap>
          <div className="box_img" onClick={handleToggle}>
            {winReady && (
              <ReactPlayer
                light={<img src="https://dev-gopizza-homepage.s3.ap-northeast-2.amazonaws.com/ui/images/start/competitive/videox2.webp" alt="Thumbnail" />}
                url="https://www.youtube.com/watch?v=-CroK4_iox4"
                width="100%"
                height="100%"
                playing={true}
                opts={{
                  playerVars: {
                    rel: 0,
                    modestbranding: 1,
                    loop: 0,
                  },
                }}
              />
            )}
          </div>
        </VideoWrap>
      </div>
      <h4>
        <span className="txt">고피자 핵심 경쟁력</span>
      </h4>
      <ul className="list_strong">
        {StrongTxt.map((el) => (
          <li key={el.id}>
            <p className="txt">{el.tit}</p>
            <dl>
              <dt>{el.tit}</dt>
              {el.id !== 2 ? (
                <dd>
                  <p className="txt1">{el.txt1}</p>
                  <p className="txt2">{el.txt2}</p>
                </dd>
              ) : (
                <>
                  <dd className="mobile">
                    <p className="txt1">
                      세상에서 가장 쉬운
                      <br />
                      방법으로 피자를 만듭니다.
                    </p>
                    <p className="txt2">
                      피자 만드는 방법을 처음부터
                      <br />
                      끝까지 완전히 새롭게 혁신했습니다. 점주의 수익성뿐만 아니라 워라밸까지 챙길 수 있는 고피자 오퍼레이션을 경험해보세요.
                    </p>
                  </dd>
                  <dd className="pc">
                    <p className="txt1">{el.txt1}</p>
                    <p className="txt2">{el.txt2}</p>
                  </dd>
                </>
              )}
            </dl>
          </li>
        ))}
      </ul>
    </Strong3Wrap>
  );
}

export default Strong3;
