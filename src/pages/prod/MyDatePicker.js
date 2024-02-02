import React from "react";
import { DatePicker } from "antd";
import { CalendarOutlined } from "@ant-design/icons";

const inputStyle = {
  width: "200px",
  height: "50px",
  borderRadius: "10px",
  border: "1px solid #2C39B5",
  flexShrink: 0,
};

const MyDatePicker = () => (
  <div>
    <DatePicker
      style={inputStyle}
      placeholder={["구매일"]}
      format="YYYY/MM/DD"
      suffixIcon={<CalendarOutlined style={{ color: "#2C39B5" }} />}
    />
  </div>
);
export default MyDatePicker;
