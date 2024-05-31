import React from "react";
import { useState, useEffect } from "react";
// import RefreshIcon from './RefreshIcon.webp'
// import { DropdownDown, DropdownUp } from "assets/svg";
// import BoxIcon from './BoxIcon.webp';
// import { connect } from "react-redux";
import './drop-down.scss';




const DropDown = ({ itemList = [], onSelect = () => { }, isBox = false, selectedIndex = 1, selectedValue = '',languageDetails = {}}) => {
  const [isListOpen, setIsListOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
//   const { isArabic = false } = languageDetails || {};

  useEffect(() => {
    setSelectedItem(itemList[selectedIndex - 1])
  }, [selectedIndex]);

  useEffect(() => {
    setSelectedItem(itemList[selectedIndex - 1])
  }, [])
  // useEffect(() => {
  //   setSelectedItem(itemList[selectedIndex - 1])
  // }, [loginUserData])


  useEffect(() => {
    if (selectedValue) {
      const selectedItem = itemList.filter((data, id) => data.value === selectedValue);
      if (selectedItem.length > 0) {
        setSelectedItem(selectedItem[0])
      }
    }

  }, [selectedValue])


  const onSelectedItem = (item) => {
    setSelectedItem(item);
    setIsListOpen(false)
    onSelect(item)
  }

  useEffect(() => {
    setTimeout(() => {
      if (isListOpen) {
        window.addEventListener('click', onClose);
      } else {
        window.removeEventListener('click', onClose);
      }
    }, 0);
    return () => {
      window.removeEventListener('click', onClose);
    }
  }, [isListOpen]);

  const onClose = () => setIsListOpen(false);
  return (
    <div id="drop-doen-wrap-1" className={`drop-down-wrapper-supplement`}>
      <div id="drop-doen-wrap-2" className={`dd-header ${isListOpen && 'remove-border'}`} onClick={() => setIsListOpen(prevState => !prevState)}>
        {/* <img id="drop-doen-wrap-3" className="refresh-icon" src={(isBox) ? BoxIcon : RefreshIcon} alt="refresh" /> */}
        {/* <div id="drop-doen-wrap-4" className="dd-header-title">{selectedItem.label || ""}</div> */}
        <span id="drop-doen-wrap-5" className="dd-arrow">
          {/* {DropdownDown} */}
          <src img="/static/d6c27c07a59a5d26042f.svg"></src>
        </span>
      </div>
      {isListOpen &&
        <div className="dd-list" id="dd-list">
          <div className="dd-scroll-list" id="dd-scroll-list">
            {
              itemList.map((item, index) => {
                const isSelected = (selectedItem.value === item.value)
                return (
                  <div key={item.value} className={`dd-list-item ${isSelected && 'dd-list-item-selected'}`} onClick={() => onSelectedItem(item)} id={"dd-list-item"+index}>
                    <span>{item.label}</span>
                  </div>
                )
              })
            }
          </div>
        </div>
      }
    </div>
  )
}

export default DropDown;


