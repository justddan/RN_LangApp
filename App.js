import React, { useRef, useState } from "react";
import { Animated, Easing, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const Box = styled.View`
  background-color: tomato;
  width: 200px;
  height: 200px;
`;

const AnimatedBox = Animated.createAnimatedComponent(Box);

export default function App() {
  const [up, setUp] = useState(false);
  const Y = useRef(new Animated.Value(0)).current;
  const toggleUp = () => {
    setUp((prev) => !prev);
  };
  const moveUp = () => {
    Animated.timing(Y, {
      toValue: up ? 200 : -200,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(toggleUp);
  };

  Y.addListener(({ value }) => console.log(value));

  return (
    <Container>
      <TouchableOpacity onPress={moveUp}>
        <AnimatedBox style={{ transform: [{ translateY: Y }] }} />
      </TouchableOpacity>
    </Container>
  );
}
