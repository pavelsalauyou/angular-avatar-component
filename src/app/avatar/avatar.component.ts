import { Component, inject, input, OnInit } from '@angular/core';

import { createAvatar } from '@dicebear/core';
import { identicon, initials } from '@dicebear/collection';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { v7 as uuid } from 'uuid';

export interface Preset {
  style: any,
  options?: {
    scale?: number;
    backgroundColor?: string[];
    fontWeight?: number;
  }
}

const presets: {[prop: string]: Preset} = {
  'identicon': {
    style: identicon,
    options: {
      scale: 55,
      backgroundColor: ['cbebf7', 'ebe1fc', 'd1f9db', 'f7e4e7', 'fce8d4', 'dcfcf9']
    }
  },
  'initials': {
    style: initials,
    options: {
      scale: 75,
      fontWeight: 500
    }
  }
};

@Component({
  selector: 'app-avatar',
  exportAs: 'appAvatar',
  standalone: true,
  imports: [],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
  host: {
    'class': 'app-avatar',
  }
})
export class AvatarComponent implements OnInit {
  private _domSanitizer = inject(DomSanitizer);

  src = input<string>();
  alt = input<string>();
  presenceIndicator = input<'online' | 'offline' | null>(null);
  key = input<any>();
  preset = input<string>('identicon');

  protected placeholder: SafeHtml = '';

  ngOnInit() {
    const preset = presets[this.preset()];
    const avatar = createAvatar(preset.style, {
      seed: this.key() || '',
      ...preset.options
    });
    this.placeholder = this._domSanitizer.bypassSecurityTrustHtml(
      avatar.toString().replace('viewboxMask', uuid())
    );
  }
}
