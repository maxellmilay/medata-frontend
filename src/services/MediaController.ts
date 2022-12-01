import {
  createMedia,
  getAllMedia,
  getSingleMedia,
  getAllFilteredMedia,
  deleteSingleMedia,
  updateSingleMedia,
} from './MediaService';

export async function fetchMediaTypes(email: string) {
  const allMedia = await getAllMedia(email);
  const mediaTypes: String[] = [];
  allMedia.forEach((item) => {
    const doesTypeExists = mediaTypes.includes(item.type);
    if (doesTypeExists) {
      return;
    }
    mediaTypes.push(item.type);
  });
  return mediaTypes;
}

export async function fetchAllMediaData(email: string) {
  const allMedia = await getAllMedia(email);
  return allMedia;
}

export async function fetchStatusInfoData(email?: String) {
  const allMedia = await getAllMedia(email);
  const inProgress = allMedia.filter(
    (media) => media.statusType === 'In Progress'
  );
  const completed = allMedia.filter(
    (media) => media.statusType === 'Completed'
  );
  const toExplore = allMedia.filter(
    (media) => media.statusType === 'To Explore'
  );
  const dropped = allMedia.filter((media) => media.statusType === 'Droppped');

  const statuses = {
    total: allMedia.length,
    inProgress: inProgress.length,
    completed: completed.length,
    toExplore: toExplore.length,
    dropped: dropped.length,
  };

  return statuses;
}

export async function fetchMediaItems(type: String, email: string) {
  const filteredMedia = await getAllFilteredMedia(type, email);
  return filteredMedia;
}

export async function addMediaItem(newMedia: any) {
  await createMedia(newMedia);
}

export async function fetchSingleMediaItem(id: String) {
  const currentMedia = await getSingleMedia(id);
  return currentMedia;
}

export async function updateMediaItem(id: String, newMedia: any) {
  await updateSingleMedia(id, newMedia);
}

export async function deleteMediaItem(id: String) {
  await deleteSingleMedia(id);
}
