import React, { useState, useEffect, useRef } from 'react';
import { Transition, ActionIcon, Menu, Divider, Button } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { FiMenu } from 'react-icons/fi';
import ModalActionEditSlice, { setParentId, openModal, openedSelector } from '../ModalActionAdd/ModalActionAddSlice';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash/debounce';

function MenuIcon() {
  const [isScrolling, setIsScrolling] = useState(false);
  const iconRef = useRef();
  const dispatch = useDispatch();
  const addModalOpened = useSelector(store => store.ui.modals.actionAdd.opened);
  const editModalOpened = useSelector(store => store.ui.modals.actionEdit.opened);
  const [scroll, scrollTo] = useWindowScroll();

  // When scroll starts
  useEffect(() => {
    setIsScrolling(true);
  }, [scroll]);

  // Using debounce to detect when scrolling has stopped
  const handleScrollEnd = debounce(() => {
    setIsScrolling(false);
  }, 500);

  useEffect(() => {
    handleScrollEnd();
    // Cleanup to avoid memory leaks
    return () => {
      handleScrollEnd.cancel();
    };
  }, [scroll]);

  const handleNewActionClick = () => {
    dispatch(setParentId({ value: '' }));
    dispatch(openModal({}));
  };

  return (
    <Transition
      mounted={!isScrolling && !addModalOpened && !editModalOpened}
      transition="slide-up"
      duration={500}
      timingFunction='ease'
    >
      {(transitionStyles) => (
        <div style={{
          ...transitionStyles,
          position: 'fixed',
          bottom: 0,
          left: '50%',              // Add this line
          transform: 'translateX(-50%)',  // Add this line
          paddingBottom: "2rem",
          zIndex: 100
        }}>
          <Menu zIndex={1000} width={"14rem"} position={"top"}>
            <Menu.Target>
              <ActionIcon
                style={{ boxShadow: "0px 0px 5px 1px rgba(0, 0, 0, .25)" }}
                color="green" size="3rem" radius="xl" variant="filled">
                <FiMenu size="1.5rem" />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Create new datum...</Menu.Label>
              <Menu.Item onClick={handleNewActionClick}>Action</Menu.Item>
              <Divider />
              <Menu.Label>Misc.</Menu.Label>
              <Menu.Item disabled>Settings</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      )}
    </Transition>
  );
}

export default MenuIcon;
