import React, { useState } from 'react';
import { List, ListItem, ListItemText, Collapse, Checkbox } from '@mui/material';
import { ButtonBase,Typography } from '@mui/material';
import { Card,CardHeader } from '@mui/material';
import { CheckBoxItem } from '../../../interfaces/CheckBoxList';

const items: CheckBoxItem[] = [
  {
    name: 'customer_service',
    children: [
      { name: 'support' },
      { name: 'customer_success' },
    ],
  },
  {
    name: 'design',
    children: [
      { name: 'graphic_design' },
      { name: 'product_design' },
      { name: 'web_design' },
    ],
  },
];

const NestedList = () => {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const handleClick = (name: string) => {
    setOpen((prevOpen) => ({ ...prevOpen, [name]: !prevOpen[name] }));
  };

  const handleCheck = (item: CheckBoxItem) => {
    setChecked((prevChecked) => {
      const newChecked = { ...prevChecked, [item.name]: !prevChecked[item.name] };
      if (item.children) {
        item.children.forEach((child) => {
          newChecked[child.name] = newChecked[item.name];
        });
      } else {
        const parentItem = items.find((parent) =>
          parent.children?.some((child) => child.name === item.name)
        );
        if (parentItem && parentItem.children) {
          newChecked[parentItem.name] = parentItem.children.every(
            (child) => newChecked[child.name]
          );
        }
      }
      return newChecked;
    });
  };
  
  const isParentChecked = (item: CheckBoxItem) =>
    item.children && item.children.every((child) => checked[child.name]);

  const renderList = (items: CheckBoxItem[], isChildList = false) => (
    <List sx={{ pl: isChildList ? 4 : 0 }}>
      {items.map((item) => (
        <React.Fragment key={item.name}>
          <ListItem>
            {item.children && (
              <ButtonBase onClick={() => handleClick(item.name)}>
                <Typography variant="button" sx={{ fontSize: 20 }}>
                  {open[item.name] ? '-' : '+'}
                </Typography>
              </ButtonBase>
            )}
            <Checkbox
              checked={isParentChecked(item) || !!checked[item.name]}
              onChange={() => handleCheck(item)}
            />
            <ListItemText primary={item.name} />
          </ListItem>
          {item.children && (
            <Collapse in={open[item.name]} timeout="auto" unmountOnExit>
              {renderList(item.children, true)}
            </Collapse>
          )}
        </React.Fragment>
      ))}
    </List>
  );

  return (
    <Card elevation={6}>
        <CardHeader title="Nested Checkboxes" />
        {renderList(items)}
    </Card>
  );
};

export default NestedList;
