import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import close from "../images/close.png";
import menu from "../images/menu.png";

const Container = styled.div`
  background-color: #e3ecf1;
  display: none;
  @media screen and (max-width: 700px) {
    display: flex;
  }
`;
const SidebarBox = styled.div`
  background-color: #222;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  transition: 0.4s ease;
  color: #202020;
  height: 100%;
  z-index: 99;
`;

const SidebarBtn = styled.button`
  position: relative;
  left: -50px;
  top: 10px;
  width: 40px;
  height: 40px;
  z-index: 99;
  transition: 0.8s ease;
  border-radius: 40px;
  overflow: hidden;
  background-color: transparent;
`;

const OpenBtn = styled.img`
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  position: relative;
  width: 100%;
  font-size: 100px;
`;

const Sidebar = ({ width = 280, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [xPosition, setXPosition] = useState(-width);
  const side = useRef();

  // 버튼 클릭 시 토글
  const sidebarButton = () => {
    if (xPosition < 0) {
      setXPosition(0);
      setIsOpen(true);
    } else {
      setXPosition(-width);
      setIsOpen(false);
    }
  };

  // sidebar 외부 클릭 시 닫힘.
  const handleClose = async (e) => {
    let sideArea = side.current;
    let sideCildren = side.current.contains(e.target);
    if (isOpen && (!sideArea || !sideCildren)) {
      await setXPosition(-width);
      await setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClose);
    return () => {
      window.removeEventListener("click", handleClose);
    };
  });

  // 1. props 매개변수의 width에 기본값 280을 설정해둠으로써 오류를 일차 방지합니다.
  // 2. 외부 클릭시 닫히는 함수를 원하지 않는다면  handleClose, useEffect(()=> {widow.addEventListener..}) 두 부분을 삭제하고 사용하시면 됩니다.
  // 3. 컴포넌트가 사용되는 위치에서 자식요소로 들어가있던 데이터가 {children} 위치로 구현됩니다.

  return (
    <Container>
      <SidebarBox
        ref={side}
        style={{
          width: `${width}px`,
          height: "100%",
          transform: `translatex(${-xPosition}px)`,
        }}
      >
        <SidebarBtn onClick={() => sidebarButton()}>
          {isOpen ? (
            <img
              src={close}
              style={{
                display: "block",
                width: "25px",
                height: "25px",
                position: "absolute",
                left: "7px",
                top: "7px",
              }}
            ></img>
          ) : (
            <OpenBtn
              src="https://via.placeholder.com/250x250"
              alt="Content Open Button"
            ></OpenBtn>
          )}
        </SidebarBtn>
        <Content>{children}</Content>
        {/* 사이드바 컴포넌트 내부 값이 구현되는 값 */}
      </SidebarBox>
    </Container>

    //     const Container = styled.div``;
    // const SidebarBox = styled.div``;

    // const SidebarBtn = styled.button``;

    // const OpenBtn = styled.img``;

    // const Content = styled.div``;
  );
};

export default Sidebar;
