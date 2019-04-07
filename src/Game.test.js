import React from "react";
import { expect } from "chai";
import { shallow } from "enzyme";
import sinon from "sinon";

import GameView from "./GameView";
import TableauView from "./Tableau";
import CardView from "./CardView";
import Foundations from "./FoundationsView";

describe("< GameView/>", function() {
  it("renders without crashing", function() {
    shallow(<GameView />);
  });
});

describe("< GameView", function() {
  it("should render 1 <TableuView />", function() {
    const wrapper = shallow(<GameView />);
    expect(wrapper.find(<TableauView />).exists()).to.equal(true);
  });
});
