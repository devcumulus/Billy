import React, { useState, useRef, useEffect } from "react";
import { DatePicker } from "antd";
import { CalendarOutlined, ArrowRightOutlined } from "@ant-design/icons";
import koKR from "antd/lib/date-picker/locale/ko_KR";

const Calendar = ({ onDateSelect, marginBottom }) => {
  const [selectedDateRange, setSelectedDateRange] = useState([]);
  const calendarContainerRef = useRef(null);

  const handleDateRangeChange = (dates, dateStrings) => {
    setSelectedDateRange(dates);

    if (typeof onDateSelect === "function") {
      onDateSelect(dateStrings[0], dateStrings[1]);
    }
  };

  const inputStyle = {
    width: "480px",
    height: "53.715px",
    borderRadius: "10px",
    border: "1px solid #2C39B5",
    flexShrink: 0,
    marginBottom: marginBottom ? marginBottom : "40px",
  };

  const calendarPopupStyle = {
    marginLeft: "-150px",
  };

  useEffect(() => {
    const handleScroll = () => {};

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={calendarContainerRef}
      style={{ position: "relative", overflow: "hidden" }}
    >
      <DatePicker.RangePicker
        onChange={handleDateRangeChange}
        value={selectedDateRange}
        format="YYYY/MM/DD"
        style={inputStyle}
        placeholder={["시작일", "종료일"]}
        suffixIcon={<CalendarOutlined style={{ color: "#2C39B5" }} />}
        popupStyle={calendarPopupStyle}
        getCalendarContainer={() => calendarContainerRef.current}
        locale={koKR}
        separator={
          <span style={{ color: "#2C39B5", marginLeft: "5px" }}>
            <ArrowRightOutlined style={{ fontSize: "18px" }} />
          </span>
        }
      />
    </div>
  );
};

export default Calendar;
