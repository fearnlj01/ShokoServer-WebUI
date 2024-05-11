import React, { useEffect, useState } from 'react';

import SelectMultiple from '@/components/Input/SelectMultiple';
import ShokoPanel from '@/components/Panels/ShokoPanel';
import useEventCallback from '@/hooks/useEventCallback';

import type { Option } from '@/components/Input/SelectMultiple';

const groupFilterOptions = {
  release_group: [
    { label: 'Release Group', value: 'GroupName', default: true },
  ],
  video: [
    { label: 'Codec', value: 'VideoCodecs' },
    { label: 'Bit Depth', value: 'VideoBitDepth' },
    { label: 'Resolution', value: 'VideoResolution', default: true },
  ],
  file: [
    { label: 'Version', value: 'FileVersion', default: true },
    { label: 'Source', value: 'FileSource' },
    { label: 'Location', value: 'FileLocation', default: true },
  ],
  audio: [
    { label: 'Codec', value: 'AudioCodecs' },
    { label: 'Languages', value: 'AudioLanguages', default: true },
    { label: 'Streams', value: 'AudioStreamCount' },
  ],
  subtitles: [
    { label: 'Codec', value: 'SubtitleCodecs' },
    { label: 'Languages', value: 'SubtitleLanguages', default: true },
    { label: 'Streams', value: 'SubtitleStreamCount' },
  ],
};
const getDefault = (options: Option[]) => options.filter(o => o.default).map(o => o.value);
const defaults = {
  release_group: getDefault(groupFilterOptions.release_group),
  video: getDefault(groupFilterOptions.video),
  file: getDefault(groupFilterOptions.file),
  audio: getDefault(groupFilterOptions.audio),
  subtitles: getDefault(groupFilterOptions.subtitles),
};

type GroupFilterPanelProps = {
  mode: 'Series' | 'Missing';
  onFilterChange: (filter: string[]) => void;
};
const GroupFilterPanel = React.memo(({ mode, onFilterChange }: GroupFilterPanelProps) => {
  const [filterReleaseGroup, setFilterReleaseGroup] = useState(defaults.release_group);
  const [filterVideo, setFilterVideo] = useState(defaults.video);
  const [filterFile, setFilterFile] = useState(defaults.file);
  const [filterAudio, setFilterAudio] = useState(defaults.audio);
  const [filterSubtitles, setFilterSubtitles] = useState(defaults.subtitles);

  const internalFilterChange = useEventCallback((options: string[], id: string) => {
    switch (id) {
      case 'filter-releasegroup':
        setFilterReleaseGroup(options);
        break;
      case 'filter-file':
        setFilterFile(options);
        break;
      case 'filter-video':
        setFilterVideo(options);
        break;
      case 'filter-audio':
        setFilterAudio(options);
        break;
      case 'filter-subtitles':
        setFilterSubtitles(options);
        break;
      default:
        break;
    }
  });

  const resetFilters = () => {
    setFilterReleaseGroup(defaults.release_group);
    setFilterVideo(defaults.video);
    setFilterFile(defaults.file);
    setFilterAudio(defaults.audio);
    setFilterSubtitles(defaults.subtitles);
  };

  useEffect(() => resetFilters(), [mode]);

  useEffect(
    () => onFilterChange([...filterReleaseGroup, ...filterVideo, ...filterFile, ...filterAudio, ...filterSubtitles]),
    [filterAudio, filterFile, filterReleaseGroup, filterSubtitles, filterVideo, onFilterChange],
  );

  return (
    <ShokoPanel
      title="Grouping Options"
      contentClassName="flex flex-col gap-y-6"
      transparent
      fullHeight={false}
    >
      <SelectMultiple
        id="filter-releasegroup"
        options={groupFilterOptions.release_group}
        onChange={internalFilterChange}
        label="Release Group"
      />
      <SelectMultiple
        id="filter-file"
        options={groupFilterOptions.file}
        onChange={internalFilterChange}
        label="File"
      />
      <SelectMultiple
        id="filter-video"
        options={groupFilterOptions.video}
        onChange={internalFilterChange}
        label="Video"
      />
      <SelectMultiple
        id="filter-audio"
        options={groupFilterOptions.audio}
        onChange={internalFilterChange}
        label="Audio"
      />
      <SelectMultiple
        id="filter-subtitles"
        options={groupFilterOptions.subtitles}
        onChange={internalFilterChange}
        label="Subtitles"
      />
    </ShokoPanel>
  );
});

export default GroupFilterPanel;
