/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { action, Story as _Story } from "@ladle/react";
import { ActionGroup } from "../";
import BookIcon from "@valence-icons/ui/Book2Fill";
import Brush from "@valence-icons/ui/PaintBrushFill";
import CopyIcon from "@valence-icons/ui/FileCopyFill";
import DeleteIcon from "@valence-icons/ui/DeleteBin3Line";
import DocumentIcon from "@valence-icons/ui/File2Fill";
import DrawIcon from "@valence-icons/ui/PencilFill";
import DuplicateIcon from "@valence-icons/ui/FileCopy2Fill";
import { Flex } from "@react-valence/layout";
import Heal from "@valence-icons/ui/HeartAddFill";
import InfoIcon from "@valence-icons/ui/InformationFill";
import { Item } from "@react-stately/collections";
import MoveIcon from "@valence-icons/ui/DragMoveFill";
import PropertiesIcon from "@valence-icons/ui/HomeGearFill";
import React from "react";
import Sampler from "@valence-icons/ui/SyringeFill";
import Select from "@valence-icons/ui/CropFill";
import SettingsIcon from "@valence-icons/ui/Settings2Fill";
//import { storiesOf } from "@storybook/react";
import TagBold from "@valence-icons/ui/Bold";
import TagItalic from "@valence-icons/ui/Italic";
import TagUnderline from "@valence-icons/ui/Underline";
import { Text } from "@react-valence/text";
import TextAlignCenter from "@valence-icons/ui/AlignCenter";
import TextAlignJustify from "@valence-icons/ui/AlignJustify";
import TextAlignLeft from "@valence-icons/ui/AlignLeft";
import TextAlignRight from "@valence-icons/ui/AlignRight";
import TextIcon from "@valence-icons/ui/Text";
import TextStrikethrough from "@valence-icons/ui/Strikethrough";
import TextStyle from "@valence-icons/ui/StickyNoteLine";
import { Tooltip, TooltipTrigger } from "@react-valence/tooltip";
import VectorDraw from "@valence-icons/ui/PenNibFill";
import { View } from "@react-valence/view";
import ViewCardIcon from "@valence-icons/ui/FullscreenFill";
import ViewGridIcon from "@valence-icons/ui/GridFill";
import ViewListIcon from "@valence-icons/ui/FileListFill";

import { ValenceActionGroupProps } from "@types-valence/actiongroup";

const docItems = [
  { children: "Document setup", name: "1" },
  { children: "Settings", name: "2" },
];
const editItems = [
  { children: "Edit", name: "1" },
  { children: "Copy", name: "2" },
  { children: "Delete", name: "3" },
];
const viewItems2 = [
  { children: "Grid view", name: "1" },
  { children: "List view", name: "2" },
];
const viewItems = [
  { children: "Grid view", name: "1" },
  { children: "List view", name: "2" },
  { children: "Gallery view", name: "3" },
];
const dataItems = [
  { children: "Properties", name: "1" },
  { children: "Info", name: "2" },
  { children: "Keywords", name: "3" },
];
let onSelectionChange = action("onSelectionChange");

let iconMap = {
  "Document setup": DocumentIcon,
  Settings: SettingsIcon,
  "Grid view": ViewGridIcon,
  "List view": ViewListIcon,
  "Gallery view": ViewCardIcon,
  Edit: DrawIcon,
  Copy: CopyIcon,
  Delete: DeleteIcon,
  Properties: PropertiesIcon,
  Info: InfoIcon,
  Keywords: BookIcon,
};

type ItemType = {
  key: React.Key;
  title: string;
};

/**
 * Helper type so `bind` returns the actual Story type.
 */
interface Story<T> extends _Story<T> {
  bind: (
    this: ThisParameterType<typeof Function.bind>,
    thisArg: Parameters<typeof Function.bind>[0],
    ...argArray: Parameters<typeof Function.bind>[1][]
  ) => _Story<T>;
}

export default {
  title: "ActionGroup",
  component: ActionGroup,
};

export const Default: Story<ValenceActionGroupProps<ItemType>> = (args) => (
  <Flex direction="column" gap="size-200" width="100%" margin="size-100">
    <ActionGroup onAction={action("onAction")} {...args}>
      {docItems.map((itemProps) => (
        <Item key={itemProps.name} textValue={itemProps.name} {...itemProps} />
      ))}
    </ActionGroup>
    <ActionGroup onAction={action("onAction")} {...args}>
      {docItems.map((itemProps) => {
        let IconElement = iconMap[itemProps.children];
        return (
          <Item key={itemProps.name} textValue={itemProps.name}>
            <Text>{itemProps.children}</Text>
            <IconElement />
          </Item>
        );
      })}
    </ActionGroup>
    <ActionGroup onAction={action("onAction")} {...args}>
      {docItems.map((itemProps) => {
        let IconElement = iconMap[itemProps.children];
        return (
          <Item
            key={itemProps.name}
            textValue={itemProps.name}
            aria-label={itemProps.children}
          >
            <IconElement />
          </Item>
        );
      })}
    </ActionGroup>
  </Flex>
);

export const Falsey: Story<ValenceActionGroupProps<ItemType>> = (args) => (
  <ActionGroup onAction={action("onAction")}>
    <Item key="add">Add</Item>
    <Item key="">Delete</Item>
    <Item key="edit">Edit</Item>
  </ActionGroup>
);

export const isDisabled = Default.bind({});
isDisabled.args = { isDisabled: true, defaultSelectedKeys: ["1"] };

export const Compact = Default.bind({});
Compact.args = { density: "compact" };

export const Justified = Default.bind({});
Justified.args = { isJustified: true };

export const CompactJustified = Default.bind({});
CompactJustified.args = { isJustified: true, density: "compact"  };

export const Quiet = Default.bind({});
Quiet.args = { isQuiet: true };

export const QuietCompact = Default.bind({});
QuietCompact.args = { density: "compact", isQuiet: true };

//   .add("with falsy item key", () => (
//     <ActionGroup onAction={action("onAction")}>
//       <Item key="add">Add</Item>
//       <Item key="">Delete</Item>
//       <Item key="edit">Edit</Item>
//     </ActionGroup>
//   ))
//   .add("isDisabled", () =>
//     render({ isDisabled: true, defaultSelectedKeys: ["1"] }, docItems)
//   )
//   .add("all keys disabled", () =>
//     render({ disabledKeys: ["1", "2"] }, docItems)
//   )
//   .add("compact", () =>
//     render({ density: "compact", defaultSelectedKeys: ["1"] }, viewItems)
//   )
//   .add("isJustified", () =>
//     render({ isJustified: true, defaultSelectedKeys: ["1"] }, viewItems2)
//   )
//   .add("compact, isJustified", () =>
//     render(
//       { density: "compact", isJustified: true, defaultSelectedKeys: ["1"] },
//       viewItems2
//     )
//   )
//   .add("isQuiet", () =>
//     render({ isQuiet: true, defaultSelectedKeys: ["1"] }, editItems)
//   )
//   .add("compact, isQuiet", () =>
//     render(
//       { density: "compact", isQuiet: true, defaultSelectedKeys: ["1"] },
//       editItems
//     )
//   )
//   .add("isEmphasized", () =>
//     render({ isEmphasized: true, defaultSelectedKeys: ["1"] }, docItems)
//   )
//   .add("compact, isEmphasized", () =>
//     render(
//       { isEmphasized: true, density: "compact", defaultSelectedKeys: ["1"] },
//       viewItems
//     )
//   )
//   .add("isQuiet, isEmphasized", () =>
//     render(
//       {
//         isEmphasized: true,
//         isQuiet: true,
//         defaultSelectedKeys: ["1", "2"],
//         disabledKeys: ["2"],
//       },
//       viewItems
//     )
//   )
//   .add("staticColor=white", () => (
//     <View backgroundColor="static-seafoam-600" padding="size-1000">
//       {render({ staticColor: "white", defaultSelectedKeys: ["1"] }, viewItems)}
//     </View>
//   ))
//   .add("staticColor=white, isQuiet", () => (
//     <View backgroundColor="static-seafoam-600" padding="size-1000">
//       {render(
//         { staticColor: "white", isQuiet: true, defaultSelectedKeys: ["1"] },
//         viewItems
//       )}
//     </View>
//   ))
//   .add("staticColor=black", () => (
//     <View backgroundColor="static-yellow-400" padding="size-1000">
//       {render({ staticColor: "black", defaultSelectedKeys: ["1"] }, viewItems)}
//     </View>
//   ))
//   .add("staticColor=black, isQuiet", () => (
//     <View backgroundColor="static-yellow-400" padding="size-1000">
//       {render(
//         { staticColor: "black", isQuiet: true, defaultSelectedKeys: ["1"] },
//         viewItems
//       )}
//     </View>
//   ))
//   .add("selectionMode: multiple", () =>
//     render(
//       { selectionMode: "multiple", defaultSelectedKeys: ["1", "2"] },
//       dataItems
//     )
//   )
//   .add("selectionMode: single, disallowEmptySelection", () =>
//     render(
//       {
//         selectionMode: "single",
//         disallowEmptySelection: true,
//         defaultSelectedKeys: ["1"],
//       },
//       dataItems
//     )
//   )
//   .add("selectionMode: multiple, isQuiet", () =>
//     render(
//       {
//         isQuiet: true,
//         selectionMode: "multiple",
//         defaultSelectedKeys: ["1", "2"],
//       },
//       dataItems
//     )
//   )
//   .add("selectionMode: multiple, isQuiet, compact", () =>
//     render(
//       {
//         isQuiet: true,
//         density: "compact",
//         selectionMode: "multiple",
//         defaultSelectedKeys: ["1", "2"],
//       },
//       dataItems
//     )
//   )
//   .add("selectionMode: multiple, isEmphasized", () =>
//     render(
//       {
//         isEmphasized: true,
//         selectionMode: "multiple",
//         defaultSelectedKeys: ["1", "2"],
//       },
//       dataItems
//     )
//   )
//   .add("selectionMode: multiple, isEmphasized, compact", () =>
//     render(
//       {
//         isEmphasized: true,
//         density: "compact",
//         selectionMode: "multiple",
//         defaultSelectedKeys: ["1", "2"],
//       },
//       dataItems
//     )
//   )
//   .add("selectionMode: multiple, isEmphasized, isQuiet", () =>
//     render(
//       {
//         isEmphasized: true,
//         isQuiet: true,
//         selectionMode: "multiple",
//         defaultSelectedKeys: ["1", "2"],
//       },
//       dataItems
//     )
//   )
//   .add("selectionMode: multiple, isEmphasized, isQuiet, compact", () =>
//     render(
//       {
//         isEmphasized: true,
//         isQuiet: true,
//         density: "compact",
//         selectionMode: "multiple",
//         defaultSelectedKeys: ["1", "2"],
//       },
//       dataItems
//     )
//   )
//   // no selection mode none, it's covered in the default story visually
//   .add("vertical", () =>
//     render({ orientation: "vertical", defaultSelectedKeys: ["1"] }, docItems)
//   )
//   .add("vertical, isJustified", () =>
//     render(
//       {
//         isJustified: true,
//         orientation: "vertical",
//         defaultSelectedKeys: ["1"],
//       },
//       docItems
//     )
//   )
//   .add("vertical, compact", () =>
//     render(
//       {
//         density: "compact",
//         orientation: "vertical",
//         defaultSelectedKeys: ["1"],
//       },
//       viewItems
//     )
//   )
//   .add("vertical, isJustified, compact", () =>
//     render(
//       {
//         isJustified: true,
//         density: "compact",
//         orientation: "vertical",
//         defaultSelectedKeys: ["1"],
//       },
//       viewItems
//     )
//   )
//   .add("vertical, isQuiet", () =>
//     render(
//       { isQuiet: true, orientation: "vertical", defaultSelectedKeys: ["1"] },
//       editItems
//     )
//   )
//   .add("vertical, isQuiet, compact", () =>
//     render(
//       {
//         isQuiet: true,
//         density: "compact",
//         orientation: "vertical",
//         defaultSelectedKeys: ["1"],
//       },
//       viewItems
//     )
//   )
//   .add("disabledKeys", () =>
//     render({ disabledKeys: ["1", "2"], selectionMode: "multiple" }, dataItems)
//   )
//   .add("dynamic default", () => (
//     <ActionGroup onAction={action("onAction")} items={viewItems}>
//       {(item) => (
//         <Item key={item.name} textValue={item.name}>
//           {item.children}
//         </Item>
//       )}
//     </ActionGroup>
//   ))
//   .add("dynamic single selection", () => (
//     <ActionGroup
//       selectionMode="single"
//       onSelectionChange={(s) => onSelectionChange([...s])}
//       items={viewItems}
//     >
//       {(item) => (
//         <Item key={item.name} textValue={item.name}>
//           {item.children}
//         </Item>
//       )}
//     </ActionGroup>
//   ))
//   .add("with tooltips", () => renderTooltips({}))
//   .add("overflowMode: wrap", () => (
//     <div
//       style={{
//         padding: "10px",
//         resize: "horizontal",
//         overflow: "auto",
//         width: 250,
//         backgroundColor: "var(--spectrum-global-color-gray-50)",
//       }}
//     >
//       <ActionGroup overflowMode="wrap" onAction={action("onAction")}>
//         <Item>
//           <DrawIcon />
//           <Text>Edit</Text>
//         </Item>
//         <Item>
//           <CopyIcon />
//           <Text>Copy</Text>
//         </Item>
//         <Item>
//           <DeleteIcon />
//           <Text>Delete</Text>
//         </Item>
//         <Item>
//           <MoveIcon />
//           <Text>Move</Text>
//         </Item>
//         <Item>
//           <DuplicateIcon />
//           <Text>Duplicate</Text>
//         </Item>
//       </ActionGroup>
//     </div>
//   ))
//   .add("overflowMode: collapse", () => (
//     <div
//       style={{
//         padding: "10px",
//         resize: "horizontal",
//         overflow: "auto",
//         width: 250,
//         backgroundColor: "var(--spectrum-global-color-gray-50)",
//       }}
//     >
//       {renderCollapsible()}
//       {renderCollapsible({ density: "compact" })}
//       {renderCollapsible({ density: "compact", isJustified: true })}
//       {renderCollapsible({ isQuiet: true })}
//     </div>
//   ))
//   .add("overflowMode: collapse, disabledKeys", () => (
//     <div
//       style={{
//         padding: "10px",
//         resize: "horizontal",
//         overflow: "auto",
//         width: 250,
//         backgroundColor: "var(--spectrum-global-color-gray-50)",
//       }}
//     >
//       {renderCollapsible({ disabledKeys: ["edit", "duplicate"] })}
//       {renderCollapsible({
//         density: "compact",
//         disabledKeys: ["edit", "duplicate"],
//       })}
//       {renderCollapsible({
//         density: "compact",
//         disabledKeys: ["edit", "duplicate"],
//         isJustified: true,
//       })}
//       {renderCollapsible({
//         disabledKeys: ["edit", "duplicate"],
//         isQuiet: true,
//       })}
//     </div>
//   ))
//   .add("buttonLabelBehavior: hide", () => (
//     <div
//       style={{
//         padding: "10px",
//         resize: "horizontal",
//         overflow: "auto",
//         width: 250,
//         backgroundColor: "var(--spectrum-global-color-gray-50)",
//       }}
//     >
//       {renderCollapsible({ buttonLabelBehavior: "hide" })}
//       {renderCollapsibleText({ buttonLabelBehavior: "hide" })}
//     </div>
//   ))
//   .add("buttonLabelBehavior: collapse", () => (
//     <div
//       style={{
//         padding: "10px",
//         resize: "horizontal",
//         overflow: "auto",
//         width: 500,
//         backgroundColor: "var(--spectrum-global-color-gray-50)",
//       }}
//     >
//       {renderCollapsible({ buttonLabelBehavior: "collapse" })}
//       {renderCollapsibleText({ buttonLabelBehavior: "collapse" })}
//     </div>
//   ))
//   .add("overflowMode: collapse, selection", () => (
//     <div
//       style={{
//         padding: "10px",
//         resize: "horizontal",
//         overflow: "auto",
//         display: "flex",
//         gap: 10,
//         width: 300,
//         backgroundColor: "var(--spectrum-global-color-gray-50)",
//       }}
//     >
//       {renderCollapsibleFormatting({
//         density: "compact",
//         maxWidth: "50%",
//         isEmphasized: true,
//       })}
//       {renderCollapsibleAlignment({
//         density: "compact",
//         maxWidth: "50%",
//         isEmphasized: true,
//       })}
//     </div>
//   ))
//   .add("overflowMode: collapse, summaryIcon", () => (
//     <div
//       style={{
//         padding: "10px",
//         resize: "horizontal",
//         overflow: "auto",
//         display: "flex",
//         gap: 10,
//         width: 300,
//         backgroundColor: "var(--spectrum-global-color-gray-50)",
//       }}
//     >
//       {renderCollapsibleFormatting({
//         density: "compact",
//         overflowMode: "collapse",
//         summaryIcon: <TextStyle />,
//         isEmphasized: true,
//       })}
//       {renderCollapsibleAlignment({
//         density: "compact",
//         overflowMode: "collapse",
//         isEmphasized: true,
//       })}
//     </div>
//   ))
//   .add("overflowMode: collapse, single selection", () => (
//     <div
//       style={{
//         padding: "10px",
//         resize: "horizontal",
//         overflow: "auto",
//         display: "flex",
//         gap: 10,
//         width: 300,
//         backgroundColor: "var(--spectrum-global-color-gray-50)",
//       }}
//     >
//       {renderCollapsibleAlignment({
//         density: "compact",
//         maxWidth: "50%",
//         isEmphasized: true,
//       })}
//       {renderCollapsibleAlignment({
//         density: "compact",
//         maxWidth: "50%",
//         isEmphasized: true,
//         buttonLabelBehavior: "show",
//       })}
//       {renderCollapsibleAlignmentNoIcons({
//         density: "compact",
//         maxWidth: "50%",
//         isEmphasized: true,
//         buttonLabelBehavior: "show",
//       })}
//     </div>
//   ))
//   .add("orientation: vertical, overflowMode: collapse", () => (
//     <div
//       style={{
//         padding: "10px",
//         resize: "vertical",
//         overflow: "auto",
//         width: 32,
//         backgroundColor: "var(--spectrum-global-color-gray-50)",
//       }}
//     >
//       {renderCollapsible({
//         orientation: "vertical",
//         buttonLabelBehavior: "hide",
//         maxHeight: "100%",
//         marginBottom: 0,
//       })}
//     </div>
//   ))
//   .add("orientation: vertical, overflowMode: collapse, selection", () => (
//     <Flex direction="column">
//       <p>
//         Note: this is currently unsupported by Valence. Container should scroll.
//       </p>
//       <div
//         style={{
//           padding: "10px",
//           resize: "vertical",
//           overflow: "auto",
//           width: 32,
//           backgroundColor: "var(--spectrum-global-color-gray-50)",
//         }}
//       >
//         {renderTools({
//           orientation: "vertical",
//           buttonLabelBehavior: "hide",
//           maxHeight: "100%",
//         })}
//       </div>
//     </Flex>
//   ));

// function render(props, items) {
//   return (
//     <Flex gap="size-300" margin="size-100" width="100%" direction="column">
//       {renderText(props, items)}
//       {renderBoth(props, items)}
//       {renderIcons(props, items)}
//     </Flex>
//   );
// }

// function renderText(props, items: any = docItems) {
//   return (
//     <ActionGroup
//       selectionMode="single"
//       onSelectionChange={(s) => onSelectionChange([...s])}
//       {...props}
//     >
//       {items.map((itemProps) => (
//         <Item key={itemProps.name} textValue={itemProps.name} {...itemProps} />
//       ))}
//     </ActionGroup>
//   );
// }

// function renderBoth(props, items: any = docItems) {
//   return (
//     <ActionGroup
//       selectionMode="single"
//       onSelectionChange={(s) => onSelectionChange([...s])}
//       {...props}
//     >
//       {items.map((itemProps) => {
//         let IconElement = iconMap[itemProps.children];
//         return (
//           <Item
//             key={itemProps.name}
//             textValue={itemProps.name}
//             aria-label={itemProps.children}
//           >
//             <Text>{itemProps.children}</Text>
//             <IconElement />
//           </Item>
//         );
//       })}
//     </ActionGroup>
//   );
// }

// function renderIcons(props, items: any = docItems) {
//   return (
//     <ActionGroup
//       selectionMode="single"
//       onSelectionChange={(s) => onSelectionChange([...s])}
//       {...props}
//     >
//       {items.map((itemProps) => {
//         let IconElement = iconMap[itemProps.children];
//         return (
//           <Item
//             key={itemProps.name}
//             textValue={itemProps.name}
//             aria-label={itemProps.children}
//           >
//             <IconElement />
//           </Item>
//         );
//       })}
//     </ActionGroup>
//   );
// }

// function renderTooltips(props, items: any = docItems) {
//   return (
//     <ActionGroup
//       selectionMode="single"
//       onSelectionChange={(s) => onSelectionChange([...s])}
//       {...props}
//     >
//       {items.map((itemProps) => {
//         let IconElement = iconMap[itemProps.children];
//         return (
//           <TooltipTrigger>
//             <Item
//               key={itemProps.name}
//               textValue={itemProps.children}
//               aria-label={itemProps.children}
//             >
//               <IconElement />
//             </Item>
//             <Tooltip>{itemProps.children}</Tooltip>
//           </TooltipTrigger>
//         );
//       })}
//     </ActionGroup>
//   );
// }

// function renderCollapsible(props = {}) {
//   return (
//     <ActionGroup
//       overflowMode="collapse"
//       onAction={action("onAction")}
//       marginBottom="size-250"
//       {...props}
//     >
//       <Item key="edit">
//         <DrawIcon />
//         <Text>Edit</Text>
//       </Item>
//       <Item key="copy">
//         <CopyIcon />
//         <Text>Copy</Text>
//       </Item>
//       <Item key="delete">
//         <Text>Delete</Text>
//         <DeleteIcon />
//       </Item>
//       <Item key="move">
//         <MoveIcon />
//         <Text>Move</Text>
//       </Item>
//       <Item key="duplicate">
//         <DuplicateIcon />
//         <Text>Duplicate</Text>
//       </Item>
//     </ActionGroup>
//   );
// }

// function renderCollapsibleText(props = {}) {
//   return (
//     <ActionGroup
//       overflowMode="collapse"
//       onAction={action("onAction")}
//       {...props}
//       marginBottom="size-250"
//     >
//       <Item key="edit">Edit</Item>
//       <Item key="copy">Copy</Item>
//       <Item key="delete">Delete</Item>
//       <Item key="move">Move</Item>
//       <Item key="duplicate">Duplicate</Item>
//     </ActionGroup>
//   );
// }

// function renderCollapsibleFormatting(props = {}) {
//   return (
//     <ActionGroup
//       aria-label="Text style"
//       overflowMode="collapse"
//       selectionMode="multiple"
//       onSelectionChange={action("onSelectionChange")}
//       buttonLabelBehavior="hide"
//       {...props}
//     >
//       <Item key="bold">
//         <TagBold />
//         <Text>Bold</Text>
//       </Item>
//       <Item key="italic">
//         <TagItalic />
//         <Text>Italic</Text>
//       </Item>
//       <Item key="underline">
//         <TagUnderline />
//         <Text>Underline</Text>
//       </Item>
//       <Item key="strike">
//         <TextStrikethrough />
//         <Text>Strikethrough</Text>
//       </Item>
//     </ActionGroup>
//   );
// }

// function renderCollapsibleAlignment(props = {}) {
//   return (
//     <ActionGroup
//       aria-label="Text alignment"
//       overflowMode="collapse"
//       selectionMode="single"
//       defaultSelectedKeys={["left"]}
//       disallowEmptySelection
//       onSelectionChange={action("onSelectionChange")}
//       buttonLabelBehavior="hide"
//       {...props}
//     >
//       <Item key="left">
//         <TextAlignLeft />
//         <Text>Align Left</Text>
//       </Item>
//       <Item key="center">
//         <TextAlignCenter />
//         <Text>Align Center</Text>
//       </Item>
//       <Item key="right">
//         <Text>Align Right</Text>
//         <TextAlignRight />
//       </Item>
//       <Item key="justify">
//         <TextAlignJustify />
//         <Text>Justify</Text>
//       </Item>
//     </ActionGroup>
//   );
// }

// function renderCollapsibleAlignmentNoIcons(props = {}) {
//   return (
//     <ActionGroup
//       aria-label="Text alignment"
//       overflowMode="collapse"
//       selectionMode="single"
//       defaultSelectedKeys={["left"]}
//       disallowEmptySelection
//       onSelectionChange={action("onSelectionChange")}
//       {...props}
//     >
//       <Item key="left">Align Left</Item>
//       <Item key="center">Align Center</Item>
//       <Item key="right">Align Right</Item>
//       <Item key="justify">Justify</Item>
//     </ActionGroup>
//   );
// }

// function renderTools(props = {}) {
//   return (
//     <ActionGroup
//       aria-label="Tools"
//       overflowMode="collapse"
//       selectionMode="single"
//       disallowEmptySelection
//       defaultSelectedKeys={["select"]}
//       onSelectionChange={action("onSelectionChange")}
//       buttonLabelBehavior="hide"
//       isEmphasized
//       isQuiet
//       {...props}
//     >
//       <Item key="select">
//         <Select />
//         <Text>Select</Text>
//       </Item>
//       <Item key="text">
//         <TextIcon />
//         <Text>Text</Text>
//       </Item>
//       <Item key="heal">
//         <Heal />
//         <Text>Heal</Text>
//       </Item>
//       <Item key="brush">
//         <Brush />
//         <Text>Brush</Text>
//       </Item>
//       <Item key="pen">
//         <VectorDraw />
//         <Text>Pen</Text>
//       </Item>
//       <Item key="eyedropper">
//         <Sampler />
//         <Text>Eye dropper</Text>
//       </Item>
//     </ActionGroup>
//   );
// }
