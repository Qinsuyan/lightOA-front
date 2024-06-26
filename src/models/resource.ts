import { resource } from '@/entities/role';
import { getAllResources } from '@/service/role';
import { useState } from 'react';

export default () => {
  const [allResources, setAllResources] = useState<resource | null>(null);
  const refreshAllResources = () => {
    getAllResources().then((res) => {
      setAllResources(res.data);
    });
  };
  return {
    allResources,
    refreshAllResources,
  };
};
