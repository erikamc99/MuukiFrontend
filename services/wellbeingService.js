import api from './api';

export const fetchWellbeing = (spaceId) =>
  api.get(`/wellbeing/${spaceId}`).then(res => res.data);