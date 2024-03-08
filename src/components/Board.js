import React, { useEffect, useState } from "react";
import Panel from "./Panel";

const Board = (props) => {
  const [panels, setPanels] = useState([]);

  useEffect(() => {
    const panelsInit = [];
    for (let i = 0; i < 25; i++) {
      panelsInit.push({ number: undefined, press: true });
    }
    setPanels(panelsInit);
  }, []);

  useEffect(() => {
    if (props.currentNum === 1) {
      const nums = [];
      const panelsInit = [];
      for (let i = 1; i <= 25; i++) {
        nums.push(i);
      }
      for (let i = 0; i < 25; i++) {
        const num = nums.splice(Math.floor(Math.random() * nums.length), 1)[0];
        panelsInit.push({ number: num, press: false });
      }
      if (props.currentNum === 1) {
        setPanels(panelsInit);
      }
    }
  }, [props.currentNum]);

  const handlePanelPress = (number) => {
    if (props.currentNum !== number) {
      return;
    }
    const newPanels = panels.map((panel) => {
      return {
        number: panel.number,
        press: number === panel.number ? true : panel.press,
      };
    });
    setPanels(newPanels);
    props.addCurrentNum();
  };

  const panelItems = panels.map((panel, index) => {
    return (
      <Panel
        key={index}
        number={panel.number}
        press={panel.press}
        onClick={handlePanelPress}
      />
    );
  });

  return (<ul id="board">{panelItems}</ul>);
};

export default Board;
