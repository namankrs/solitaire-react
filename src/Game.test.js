import React from "react";
import { expect } from "chai";
import { shallow, render } from "enzyme";
import sinon from "sinon";

import Game from "./Game";
import Tableau from "./Tableau";
import CardView from "./CardView";
import Foundations from "./Foundations";

describe("< Game/>", function() {
  it("renders without crashing", function() {
    shallow(<Game />);
  });
});

describe("< GameView", function() {
  it("should render 1 <TableuView />", function() {
    const wrapper = shallow(<Game />);
    expect(wrapper.exists(".container")).to.equal(true);
  });
});
