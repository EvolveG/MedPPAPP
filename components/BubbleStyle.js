import styled from 'styled-components/native';
import { COLORS, SIZES } from '../constants';

export const BubbleContainer = styled.View`
  margin-vertical: 4px;
`;

export const BubbleWrap = styled.View`
  border-radius: 16px;
  padding: 8px 16px;
  max-width: ${SIZES.width * 0.7};
`;

export const SenderText = styled.Text`
  color: ${COLORS.black};
  
`;

export const ReceiverText = styled.Text`
  color: ${COLORS.black};
  
`;
