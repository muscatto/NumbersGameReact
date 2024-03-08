const Panel = (props) => {
  const handlePress = () => {
    props.onClick(props.number);
  };

  if (props.press) {
    return <li className="pressed">{props.number}</li>;
  } else {
    return <li onClick={handlePress}>{props.number}</li>;
  }
};

export default Panel;
