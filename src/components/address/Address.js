// 담당자 : 사공은진

// 주소 검색 모달창
export const Modal = ({ children, handleClose }) => {
  return (
    <div style={modalStyle}>
      <div style={contentStyle}>
        <span style={closeButtonStyle} onClick={handleClose}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};
const modalStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#fefefe",
  padding: "30px",
  width: "600px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};
const contentStyle = {
  position: "relative",
};
const closeButtonStyle = {
  position: "absolute",
  top: "-28px",
  right: "-27px",
  fontSize: "25px",
  cursor: "pointer",
  zIndex: "1",
};
