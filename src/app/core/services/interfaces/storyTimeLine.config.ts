import { Type } from '@angular/core';

export interface StoryTimeLineConfig {
  id: string;
  yearStory:Date;
  tittleStory:string;
  optionalImageUrl?:string;
  contentStory:string;
}