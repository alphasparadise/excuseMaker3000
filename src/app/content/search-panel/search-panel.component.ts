import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ChatGptService } from 'src/common/store/services/chat-gpt.service';

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss']
})
export class SearchPanelComponent {
  public searchControl: FormControl;

  response: string = '';
  responseCache: string[] = [];
  responseCacheIndex: number = -1;

  constructor(public chatGPTService: ChatGptService) {
    this.searchControl = new FormControl('');
  }

  navigateResponses(prevOrNext: string): void {
    switch(prevOrNext) {
      case 'PREV': {
        if (this.responseCacheIndex !== -1) {
          if ((this.responseCacheIndex - 1) > -1) {
            this.response = this.responseCache[this.responseCacheIndex - 1];
            this.responseCacheIndex = this.responseCacheIndex - 1;
          }
        } else {
          this.response = this.responseCache[this.responseCache.length - 2];
          this.responseCacheIndex = this.responseCache.length - 2;
        }
        break;
      }
      case 'NEXT': {
        if (this.responseCacheIndex !== -1) {
          if ((this.responseCacheIndex + 2) <= this.responseCache.length) {
            this.response = this.responseCache[this.responseCacheIndex + 1];
            this.responseCacheIndex = this.responseCacheIndex + 1;
          } else {
            this.performCGPTSearch();
          }
        } else {
          this.performCGPTSearch();
        }
        break;
      }
    }
  }

  performCGPTSearch(event?: any): void {
    if (!this.chatGPTService.apiCallInProgress) {
      const searchValue = event ? event.target.value : this.searchControl.value;
      const query = `Provide me with a new random short one sentence reason for: ${searchValue}`;
      this.chatGPTService.chatWithGpt(query).subscribe((data: any) => {
        console.log('response', data)
        this.response = data.choices[0].message.content;
        this.responseCache.push(this.response);
      })
    }
  }
}
