import data from "./Date";
import emojis from "./Emojis";

/**
 * Creatd By @author Robert Aslanyan
 * May 2018
 *
 */

/**  @private */
function _create(elem, name) {
  let _elem = document.createElement(elem);
  name ? (_elem.className = name) : _elem;

  return _elem;
}

/**  @private */
function _select(elem) {
  return document.querySelector(elem);
}
function _selectAll(elem) {
  return document.querySelectorAll(elem);
}

/**  @private */
function _undefined(elem) {
  return elem == undefined;
}

/**  @private */
function _parseDate(data, date) {
  for (let k in data) if (Number(k) == date) return (date = data[k]);
}

const util = () => {
  let date = new Date();
  return {
    Handler: (text, error = true, durotation = 2500) => {
      let content =
        _select(".error") || _select(".success")
          ? content
          : _create("div", error ? "error" : "success");

      if (!_undefined(content)) {
        content.textContent = text;

        let elem = _select(".input-field");
        elem.insertAdjacentElement("afterend", content);

        return setTimeout(() => content.remove(), durotation);
      }
    },
    scrollBottom(that) {
      if (
        !_undefined(that) &&
        !_undefined(that.scrollHeight) &&
        !_undefined(that.clientHeight)
      )
        return (that.scrollTop = that.scrollHeight);
    },
    setCookie(name, property = "name") {
      date.setTime(date.getTime() + 24 * 60 * 60 * 10);
      document.cookie = `${property}=${name};path=/;expires=${date.toGMTString()}`;
    },

    //// Validate Methods  /////
    validate(value) {
      let regExp = /^([a-z]{4,16})$/i;
      if (!regExp.test(value)) {
        this.Handler(
          "Login name can contain only letters with min 4 and  max 16 length",
          true,
          2000
        );
        return false;
      } else return true;
    },
    passwordValidate(value) {
      let regExp = /^(\w|\d){4,16}$/i;
      if (!regExp.test(value)) {
        this.Handler("Password  must be  min 4 and  max 16 length", true, 2000);
        return false;
      } else return true;
    },
    nameValidate(value) {
      let regExp = /^(\w|\d){4,20}$/i;
      if (!regExp.test(value)) {
        this.Handler(
          "Name must be  min 4 and  max 20 length ant can`t contain spaces ",
          true,
          2000
        );
        return false;
      } else return true;
    },

    //////////     //////////
    getFullDate() {
      let days = date.getDate(),
        weekDay = date.getDay(),
        months = date.getMonth(),
        years = date.getFullYear();

      months = _parseDate(data.MOUNTS, months);
      weekDay = _parseDate(data.MOUNTS_DAY, weekDay);

      let fullDate = `${weekDay} ${days} ${months} ${years}`;

      return fullDate;
    },
    getNow() {
      let date = new Date(),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds();

      hours < 10 ? "0" + hours : hours;
      minutes < 10 ? "0" + minutes : minutes;
      seconds < 10 ? "0" + seconds : seconds;

      let time = `${hours}:${minutes < 10 ? "0" + minutes : minutes}:${
        seconds < 10 ? "0" + seconds : seconds
      }
                        ${hours > 12 ? "PM" : "AM"}`;

      return {
        time: time,
        date: this.getFullDate()
      };
    },
    insertTo(to, first, last) {
      to.appendChild(first);
      to.appendChild(last);
    },
    /** Emoji Parser  */
    emojiParser(document) {
      let regExp = /_\w+/gi;

      for (let doc of document) {
        let text = doc.textContent.trim();
        let match = text.match(regExp);

        if (regExp.test(text)) {
          for (let code in emojis) {
            for (let i = 0; i < match.length; i++) {
              if (text.includes(match[i]) && code == match[i]) {
                text = text.replace(match[i], emojis[code]);
                doc.setAttribute("data-code", code);
                doc.innerHTML = text;
              }
            }
          }
        }
      }
    },
    /** Set Emojis  */
    setEmojis(insert) {
      for (let code in emojis) {
        let span = _create("span", "emoji");
        span.innerHTML = emojis[code];
        span.setAttribute("title", code);
        insert.appendChild(span);
      }
    },
    /** Delete Emojis */
    deleteEmojis() {
      let spans = _selectAll(".emoji");

      if (!_undefined(spans)) spans.forEach(el => el.remove());
    },
    /** Get Emojis */
    getEmojis() {
      let spans = _selectAll(".emoji"),
        input = _select(".main_input");

      spans.forEach(el => {
        el.addEventListener("click", () => {
          let text = el.textContent;
          return (input.value += text + " ");
        });
      });
    }
  };
};

export default util();
