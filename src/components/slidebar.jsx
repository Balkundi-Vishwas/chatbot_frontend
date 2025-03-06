import React, { useState, useEffect, useRef } from "react";

import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  Input,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export function SidebarWithSearch() {
  const [open, setOpen] = React.useState(0);
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = React.useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5001/api/models")
      .then((res) => res.json())
      .then((data) => {
        setModels(data.models);
        console.log("inside api call",data);
        if (data.models.length > 0) {
          setSelectedModel(data.models[0].name);
        }
      })
      .catch((err) => console.error("Error fetching models:", err));
  }, []);

  const setSelectedModelItem = (model) => {
    if (model.name !== selectedModel) {
      setSelectedModel(model.name);
      console.log("Model", model);

      fetch("http://127.0.0.1:5001/api/update-model", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: model.name,
          deployment: model.deployment,
          version: model.version,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log("Model updated on backend:", data))
        .catch((err) => console.error("Error updating model:", err));
    }
  };

  const [selectedMode, setSelectedMode] = React.useState(1);
  const setSelectedModeItem = (value) => {
    if (value !== selectedMode) {
      setSelectedMode(value);
      console.log("Mode", value);
    }
  };

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Card className="h-[calc(100vh)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 rounded-none">
      <div className="p-2">
        <Input
          icon={<MagnifyingGlassIcon className="h-5 w-5" />}
          label="Search"
        />
      </div>
      <List>
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 1 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" open={open === 1}>
            <AccordionHeader
              onClick={() => handleOpen(1)}
              className="border-b-0 p-3"
            >
              <Typography color="blue-gray" className="mr-auto font-bold">
                Models
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              {models.length > 0 ? (
                models.map((model, index) => (
                  <ListItem
                    key={index}
                    className={`hover:bg-gray-200 cursor-pointer ${selectedModel === model.name ? "bg-gray-300" : ""}`}
                    onClick={() => setSelectedModelItem(model)}
                  >
                    {model.name}
                  </ListItem>
                ))
              ) : (
                <Typography className="text-center text-gray-500">No models available</Typography>
              )}
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 2 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 2}>
            <AccordionHeader
              onClick={() => handleOpen(2)}
              className="border-b-0 p-3"
            >
              <Typography color="blue-gray" className="mr-auto font-bold">
                Modes
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem
                className={`hover:bg-gray-200 cursor-pointer ${
                  selectedMode === 1 ? "bg-gray-300" : ""
                }`}
                onClick={() => setSelectedModeItem(1)}
              >
                Engineering
              </ListItem>
              <ListItem
                className={`hover:bg-gray-200 cursor-pointer ${
                  selectedMode === 2 ? "bg-gray-300" : ""
                }`}
                onClick={() => setSelectedModeItem(2)}
              >
                Sales
              </ListItem>
              <ListItem
                className={`hover:bg-gray-200 cursor-pointer ${
                  selectedMode === 3 ? "bg-gray-300" : ""
                }`}
                onClick={() => setSelectedModeItem(3)}
              >
                Customer
              </ListItem>
              <ListItem
                className={`hover:bg-gray-200 cursor-pointer ${
                  selectedMode === 4 ? "bg-gray-300" : ""
                }`}
                onClick={() => setSelectedModeItem(4)}
              >
                Genuis Mode
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <hr className="my-2 border-blue-gray-50" />
      </List>
    </Card>
  );
}
