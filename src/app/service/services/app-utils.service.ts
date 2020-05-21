import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

import { FormGroup, FormControl } from '@angular/forms'
import { HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';

declare var $: any;

export function base64EncodeUnicode(str: any) {
  // First we escape the string using encodeURIComponent to get the UTF-8 encoding of the characters,
  // then we convert the percent encodings into raw bytes, and finally feed it to btoa() function.
  let utf8Bytes: any = encodeURIComponent(str).replace(
    /%([0-9A-F]{2})/g,
    function (match, p1) {
      return String.fromCharCode(parseInt("0x" + p1));
    }
  );

  return window.btoa(utf8Bytes);
};

export function base64DecodeUnicode(str) {
  return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''));
}
/*
function base64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}
*/

export function requiredFieldValidator(control: any) {
  let val = String(control.value || '').trim()
  return (val) ? null : { 'invalid': true }
}

export function phoneValidator(control: any) {
  const patt = /(^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\\s\\./0-9]*$)/
  let val = String(control.value || '').trim()
  const valid = (val === '' || patt.test(val))
  return (valid) ? null : { 'invalid': true }
}

export function emailValidator(control: any) {
  const patt = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  let val = String(control.value || '').trim()
  const valid = (val === '' || patt.test(val))
  return (valid) ? null : { 'invalid': true }
}

export function formatDate(d: any, format: string = 'dd/MMM/yyyy', timezone?: string, locale?: string): string {
  var datePipe = new DatePipe('en-US');
  let dateString = datePipe.transform(d, format, timezone, locale);
  return dateString;
}

export function isValidDate(d: any) {
  if (d instanceof Date) {
    if (isNaN(d.getTime())) {
      return false;
    }
  } else {
    let d1 = new Date(d);
    if (isNaN(d1.getTime())) {
      return false;
    }
  }
  return true;
}

export function parseDate(d) {
  if (d instanceof Date && !isNaN(d.getTime())) {
    //validate
  } else {
    d = new Date(d);
    if (isNaN(d.getTime())) {
      d = new Date();
    }
  }
  return d;
}

export function scrollToFragId(id) {
  if (id) {

    setTimeout(() => {
      if (id.indexOf('#') != 0) {
        id = '#' + id;
      }
      try {
        document.querySelector(id).scrollIntoView();

      } catch (e) { }
    }, 600);
  }
}
export function scrollToFragClazz(clazz) {
  if (clazz) {
    setTimeout(() => {
      if (clazz.indexOf('.') != 0) {
        clazz = '.' + clazz;
      }
      try {
        document.querySelector(clazz).scrollIntoView();
      } catch (e) { }
    }, 600);
  }
}

@Injectable({
  providedIn: 'root'
})
export class AppUtilsService {

  isIE: boolean = false

  constructor(protected router: Router) {
    this.isIE = /(Edge\/)|(Trident\/)|(MSIE\s)/.test(window.navigator.userAgent)
    console.log(this.isIE)
    console.log(window.navigator.userAgent)

    this.__padStart()
  }

  _$(id: string) {
    return <HTMLElement>document.getElementById(id)
  }

  _$clazz(clazz: string) {
    return <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName(clazz)
  }

  _$focus(id: string) {
    setTimeout(() => {
      var element = this._$(id)
      if (element)
        element.focus()
    }, 600)
  }

  _$select(id: string) {
    var element = <HTMLInputElement>document.getElementById(id)
    if (element)
      element.select()
  }

  _$alert(message: any, title: string = 'Alert') {
    //console.log('message...', JSON.stringify(message))
    let msg = this._getMessage(message);
    console.log('alert', msg);
    alert(msg)
  }

  _getMessage(err: any): string {
    console.log('_getMessage', err)
    let msg = null
    if (typeof err === 'object') {
      if (err.status >= 500) {
        msg = 'An error occurred while communicating with server side. please try again later'
      } else if (typeof err.error === 'string' && err.status >= 400) {
        msg = err.error;
      } else if (typeof err.error === 'object' || typeof err._body === 'object') {
        let error = err.error || err._body;
        msg = error.message || error.msg || error.code || error.error
      } else if (err.status >= 400) {
        msg = 'Seem your input parameters or values are not right, please make changes and try again'
      } else {
        msg = err.message || err.msg || err.code || err.error || err._body
      }
    } else if (typeof err === 'string') {
      msg = err
    }
    if (!msg) {
      msg = 'An error occurred while communicating with server side. please try again later'
    }
    return msg;
  }

  _$print(id: string, w: number = 1024, h: number = 800) {
    setTimeout(() => {
      let element = this._$(id) || this._$clazz(id)[0]
      if (!element || !element.innerHTML) {
        this._$alert('Empty content!')
        return
      }
      let opts = 'width=' + w + ',height=' + h
      let pwind = window.open('', 'PRINT', opts)

      pwind.document.write('<html><head><title>')
      pwind.document.write('TES-AMM')
      pwind.document.write('</title>')
      pwind.document.write('<base href="/">')
      pwind.document.write('<link rel="stylesheet" href="assets/css/print.css" type="text/css" media="print"/>');
      pwind.document.write('</head><body>')
      pwind.document.write(element.innerHTML)
      pwind.document.write('</body></html>')

      pwind.document.close() // necessary for IE >= 10
      pwind.focus() // necessary for IE >= 10*/

      setTimeout(() => {
        pwind.print()
        pwind.close()
      }, 600)

    }, 0);
  }

  markAsTouched(formGroup: FormGroup) {
    formGroup.markAsTouched({ onlySelf: true })
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field)
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true })
      } else if (control instanceof FormGroup) {
        this.markAsTouched(control)
      }
    })
  }

  __padStart() {
    if (!String.prototype.padStart) {
      String.prototype.padStart = function padStart(targetLength, padString) {
        targetLength = targetLength >> 0 //truncate if number, or convert non-number to 0
        padString = String(typeof padString !== 'undefined' ? padString : ' ')
        if (this.length >= targetLength) {
          return String(this)
        } else {
          targetLength = targetLength - this.length
          if (targetLength > padString.length) {
            padString += padString.repeat(targetLength / padString.length) //append to original to ensure we are longer than needed
          }
          return padString.slice(0, targetLength) + String(this)
        }
      }
    }
  }

  randomString(len: number) {
    let size = len || 8
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < size; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  //this method scrolls on the scrollbar if new message came
  scrollTo(messageId: string, depth: number) {
    setTimeout(() => {
      let msgDoc = document.getElementById(messageId);
      if (msgDoc) {
        try {
          window.scrollTo(0, msgDoc.offsetTop - 60)
        } catch (error) {
        }
      } else if (depth < 6) {
        setTimeout(() => {
          this.scrollTo(messageId, depth + 1)
        }, 600)
      }
    }, 600)
  };

  extractEmbedded(res: any, key: string): any {
    if (!res || !res._embedded) {
      return [];
    }
    return res._embedded[key] || [];
  }

  extractResult(res: any, key: string): any {
    if (!res || !res) {
      return [];
    }
    return res[key] || [];
  }


  supportIE(url: string, rootUrl?: string): string {
    if (this.isIE) {
      let rand = Math.round(Math.random() * 10000000)
      console.log('Internet Explorer Browser')
      if (url.lastIndexOf('?') > 0) {
        url += '&r' + rand
      } else {
        url += '?r' + rand
      }
    }
    return this.unifineURL(url, rootUrl)
  }

  public formatDate(d: any, format: string = 'dd-MMM-yyyy', timezone?: string, locale?: string): string {
    return formatDate(d, format, timezone, locale);
  }

  unifineURL(url: string, rootUrl?: string) {
    if (url.indexOf('http') !== 0) {
      let protocol = location.protocol
      if (url.indexOf('//') !== 0 || url.indexOf('://') !== 0) {
        if (rootUrl && url.indexOf(rootUrl) === -1) {
          url = rootUrl + url
        } else {
          url = protocol + '//' + url
        }
      } else {
        url = protocol + url
      }
    }
    return url;
  }


  getParamQueryString(paramName: string) {
    const url = window.location.href;
    let paramValue;
    if (url.includes('?')) {
      const httpParams = new HttpParams({ fromString: url.split('?')[1] });
      paramValue = httpParams.get(paramName);
    }
    return paramValue;
  }

  getParamsQueryString(queries: any = null) {
    const url = queries || window.location.href;
    let params = {};
    if (url.includes('?')) {
      let ss = new HttpParams({ fromString: url.split('?')[1] });
      let keys = ss.keys();
      keys.forEach(k => {
        params[k] = ss.get(k);
      })
    }
    return params;
  }

  redirectDetector(path: string): boolean {
    console.log('redirectDetector', this.router.url)
    if (window.location.href.indexOf(path) > 0) {
      let params = this.getParamsQueryString();
      console.log('redirectDetector execute', path, params)
      this.router.navigate([path], { queryParams: params })
      return true;
    }
    return false
  }

  directAction: any = {};
  redirectAction(path: string, isRequiredAuth: boolean = false): boolean {
    const url = window.location.href;
    console.log('redirectAction', url);
    this.directAction = {};
    let idx = url.indexOf(path);
    if (idx > 0) {
      let uri = url.split('?')[0].substring(idx);
      let params: any = this.getParamsQueryString();
      console.log('redirectAction execute', uri, params)
      if (params.q) {
        let v: any = base64DecodeUnicode(params.q);
        try {
          v = JSON.parse(v);
          if (v.id) {
            params = Object.assign(params, v);
          }
        } catch (e) { }
      }
      this.directAction = {
        'path': uri,
        'params': params,
        'isRequiredAuth': isRequiredAuth
      };
      return true;
    }
    return false
  }

  performDirectAction(isAuth: boolean) {
    let act = this.directAction;
    console.log('performDirectAction', act);
    if (act.path) {
      if (act.isRequiredAuth) {
        if (isAuth) {
          this.directAction = {};
          this.router.navigate([act.path], { queryParams: act.params });
          console.log('EXEC direct')
        } else {
          console.log('NOT exec direct')
        }
      } else {
        this.directAction = {};
        this.router.navigate([act.path], { queryParams: act.params });
        console.log('EXEC direct')
      }
    }
  };

  // TODO jquery functions -- should be removed in angular code
  loadStuff() {
    setTimeout(() => {
      if (typeof $['loadStuff'] === 'function') {
        $['loadStuff']();
      } else {
        console.log('loadStuff is NOT function')
      }
    }, 600)
  }
}
