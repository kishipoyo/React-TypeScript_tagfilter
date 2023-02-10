/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const tagsGrid = () => [
  css`
    display: grid;
    grid-template-columns: repeat(3, minmax(100px, 10%));
    grid-auto-rows: 50px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border: 1px solid black;
    margin: auto;
  `
];

export const articleGrid = () => [
  css`
    display: grid;
    grid-template-columns: repeat(4, minmax(100px, 10%));
    justify-content: center;
    align-items: start;
    gap: 20px;
    border: 1px solid black;
    margin: auto;
  `
];
