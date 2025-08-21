import { ASKAR_URL, DEPL_URL, TEST_URL } from "./constans";
import dayjs from "dayjs";


export function setUrlSource(source: 'deploy' | 'askar' | 'test') {
  switch (source) {
    case 'deploy':
      return DEPL_URL;
    case 'askar':
      return ASKAR_URL;
    case 'test':
      return TEST_URL;
  }
}

export let mode: 'test' | 'deploy' | 'askar' = 'test';

export function deleteById(array: any[], id: any) {
  let idx = array.findIndex((a) => a.Id === id);
  array.splice(idx, 1);
}
export function transferById(array: any[], id: any) {
  let idx = array.findIndex((a) => a.Id === id);
  array.splice(idx, 1);
}

export function editById(array: any[], element: any) {
  const idx = array.findIndex((a) => a.Id === element.Id);
  array[idx] = element;
}

export function timeDelay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export const defaultFilterOption = (inputValue: any, option: any) => {
  if (!option.label) return false;

  return option.label.toString().toLowerCase().includes(inputValue.toLowerCase());
};
export const dateFormat = "DD.MM.YYYY";

export const getJsonFromData = (data: any): string => {
  return JSON.stringify(data, (key, value) => {
    if (typeof value === 'string' && /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/.test(value)) {
      return dayjs(value).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    }
    return value;
  })
}

export const getDataFromJson = (json: string): any => {
  try {
    let resp = JSON.stringify(json);
    if (typeof resp === 'string') {
      return JSON.parse(resp, (key, value) => {
        if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(value)) {
          return dayjs(value || undefined);
        }
        if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
          return dayjs(value || undefined);
        }
        if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(value)) {
          return dayjs(value || undefined);
        }
        return value;
      });
    }
  } catch {
    return json;
  }
}