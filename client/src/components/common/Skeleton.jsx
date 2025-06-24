// File: src/components/Skeleton.jsx
import React from 'react'
import styled, { keyframes } from 'styled-components'

const pulse = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
`

const SkeletonWrapper = styled.div`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-color: #e0e0e0;
  border-radius: 4px;
  animation: ${pulse} 1.5s ease-in-out infinite;
`

/**
 * Skeleton
 *
 * @param {number} width  — placeholder width in pixels
 * @param {number} height — placeholder height in pixels
 */
export default function Skeleton({ width = 200, height = 300 }) {
  return <SkeletonWrapper width={width} height={height} />
}
