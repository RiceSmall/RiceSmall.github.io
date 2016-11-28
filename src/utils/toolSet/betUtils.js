export
default {
  upOrDownFlag: 1, //作为标识 作为第一次进入
  changeUpDown: 0,
  classifyDetail:{},
  isNullOrUndefined: function(obj) {
    if (!obj) {
      return [];
    }
    return obj;
  },

  /**
   * [btnMapping 丽霞写的映射btn]
   * @param  {[object]} jsonData [传入的是jsonData]
   * @return {[oject]}          [是一个映射完成的对象]
   */
  btnMapping: function shortMapping(jsonData, item, _message) {

    //let _period=String(item.optionId.match(/@(\d+)@/g)).replace(/[@#]/g,'').split(',')/*.replace(/[@#]/g,'').split(',')*///得到要传入的编号
    let shot = {
      "hostScore": _message.players[0].score[0],
      "guestScore": _message.players[1].score[0],
      "period": item.period,
      "host": jsonData.players[0].shortName,
      "guest": jsonData.players[1].shortName,
      "handicap": item.handicap != null ? item.handicap : '',
      "periodMap": {
        "0": "全场",
        "1": "第1节",
        "2": "第2节",
        "3": "第3节",
        "4": "第4节",
        "5": "上半场",
        "6": "下半场",
        "7": "加时1",
        "8": "加时2",
        "9": "加时3",
        "10": "加时4",
        "11": "加时5",
        "12": "加时6",
        "13": "加时7",
        "14": "加时8",
        "15": "加时9",
        "16": "加时10",
        "17": "加时11"
      }

    }
    //item.periods++;
    shot.data = {
      "FTSPF": {
        "btn": {
          "1": shot.host + "胜",
          "2": "平局",
          "3": shot.guest + "胜"
        },
        "name": "猜" + shot.periodMap[shot.period] + "赛果"
      },
      "FTSSC": {
        "btn": {
          "10": shot.host + "胜或平",
          "11": shot.guest + "胜或平",
          "12": "分出胜负"
        },
        "name": "同时猜两项"
      },
      "FTRFSF": {
        "btn": {
          "36": shot.host + ((shot.handicap >= 0) ? '+' + shot.handicap : shot.handicap),
          "37": shot.guest + ((shot.handicap < 0) ? (shot.handicap + '').replace('-', '+') : "-" + shot.handicap)
        },
        "name": "让球猜" + shot.periodMap[shot.period] + "输赢"
      },
      "FTDXQ": {
        "btn": {
          "34": "大于 " + shot.handicap,
          "35": "小于 " + shot.handicap
        },
        "name": shot.periodMap[shot.period] + "总进球数猜大小"
      },
      "FTBQC": {
        "btn": {
          "20": "胜胜",
          "21": "胜平",
          "22": "胜负",
          "23": "平胜",
          "24": "平平",
          "25": "平负",
          "26": "负胜",
          "27": "负平",
          "28": "负负"
        },
        "name": "猜半场及全场胜平负"
      },
      "FTBTS": {
        "btn": {
          "30": "是",
          "31": "否"
        },
        "name": shot.periodMap[shot.period] + "比赛两队是否都进球"
      },
      "FTSF": {
        "btn": {
          "1": shot.host + "胜",
          "3": shot.guest + "胜"
        },
        "name": "猜胜负（若平局退还游戏币）"
      },
      "FTTNG": [{
        "btn": {
          "43": shot.host + "有进球",
          "42": shot.host + "无进球"
        },
        "name": "猜主队是否有进球"
      }, {
        "btn": {
          "41": shot.guest + "有进球",
          "40": shot.guest + "无进球"
        },
        "name": "猜客队是否有进球"
      }],
      "FTSY10": {
        "btn": {
          "51": shot.host + "赢1球",
          "52": shot.host + "赢2球",
          "53": shot.host + "赢3球",
          "54": shot.host + "赢4球及以上",
          "55": shot.guest + "赢1球",
          "56": shot.guest + "赢2球",
          "57": shot.guest + "赢3球",
          "58": shot.guest + "赢4球及以上",
          "50": "无进球",
          "2": "平局"
        },
        "name": "猜全场比赛净胜球"
      },
      "FTFPS": {
        "btn": {
          "34": "大于 " + shot.handicap,
          "35": "小于 " + shot.handicap
        },
        "name": "红黄牌总数猜大小"
      },
      "FTJQJO": {
        "btn": {
          "32": "单数",
          "33": "双数"
        },
        "name": "总进球数猜单双"
      },
      "FTACS": [{
        "btn": {
          "60": shot.hostScore + "球",
          "61": (shot.hostScore + 1) + "球",
          "62": (shot.hostScore + 2) + "球",
          "63": (shot.hostScore + 3) + "球及以上"
        },
        "name": "猜" + shot.host + "进球数"
      }, {
        "btn": {
          "64": (shot.guestScore) + "球",
          "65": (shot.guestScore + 1) + "球",
          "66": (shot.guestScore + 2) + "球",
          "67": (shot.guestScore + 3) + "球及以上"
        },
        "name": "猜" + shot.guest + "进球数"
      }],
      "FTBF": {
        "btn": {
          "70": (shot.hostScore + 1) + ":" + (shot.guestScore),
          "71": (shot.hostScore + 2) + ":" + (shot.guestScore),
          "72": (shot.hostScore + 2) + ":" + (shot.guestScore + 1),
          "73": (shot.hostScore + 3) + ":" + (shot.guestScore),
          "74": (shot.hostScore + 3) + ":" + (shot.guestScore + 1),
          "75": (shot.hostScore + 3) + ":" + (shot.guestScore + 2),
          "76": (shot.hostScore + 4) + ":" + (shot.guestScore),
          "77": (shot.hostScore + 4) + ":" + (shot.guestScore + 1),
          "78": (shot.hostScore + 4) + ":" + (shot.guestScore + 2),
          "79": (shot.hostScore + 4) + ":" + (shot.guestScore + 3),
          "80": (shot.hostScore + 5) + ":" + (shot.guestScore),
          "81": (shot.hostScore + 5) + ":" + (shot.guestScore + 1),
          "82": (shot.hostScore + 5) + ":" + (shot.guestScore + 2),
          "83": (shot.hostScore + 5) + ":" + (shot.guestScore + 3),
          "84": (shot.hostScore + 5) + ":" + (shot.guestScore + 4),
          "85": (shot.hostScore) + ":" + (shot.guestScore),
          "86": (shot.hostScore + 1) + ":" + (shot.guestScore + 1),
          "87": (shot.hostScore + 2) + ":" + (shot.guestScore + 2),
          "88": (shot.hostScore + 3) + ":" + (shot.guestScore + 3),
          "89": (shot.hostScore + 4) + ":" + (shot.guestScore + 4),
          "90": (shot.hostScore + 5) + ":" + (shot.guestScore + 5),
          "91": (shot.hostScore) + ":" + (shot.guestScore + 1),
          "92": (shot.hostScore) + ":" + (shot.guestScore + 2),
          "93": (shot.hostScore + 1) + ":" + (shot.guestScore + 2),
          "94": (shot.hostScore) + ":" + (shot.guestScore + 3),
          "95": (shot.hostScore + 1) + ":" + (shot.guestScore + 3),
          "96": (shot.hostScore + 2) + ":" + (shot.guestScore + 3),
          "97": (shot.hostScore) + ":" + (shot.guestScore + 4),
          "98": (shot.hostScore + 1) + ":" + (shot.guestScore + 4),
          "99": (shot.hostScore + 2) + ":" + (shot.guestScore + 4),
          "100": (shot.hostScore + 3) + ":" + (shot.guestScore + 4),
          "101": (shot.hostScore) + ":" + (shot.guestScore + 5),
          "102": (shot.hostScore + 1) + ":" + (shot.guestScore + 5),
          "103": (shot.hostScore + 2) + ":" + (shot.guestScore + 5),
          "104": (shot.hostScore + 3) + ":" + (shot.guestScore + 5),
          "105": (shot.hostScore + 4) + ":" + (shot.guestScore + 5)
        },
        "name": "猜全场比分"
      },
      "FTSN": {
        "btn": {
          "431": shot.host,
          "432": shot.guest,
          "433": "均不"
        },
        "name": "猜下一个进球球队"
      },
      "FTSMN": {
        "btn": {
          "400": "射门",
          "401": "头球",
          "402": "点球",
          "403": "任意球",
          "404": "乌龙球",
          "405": "无进球"
        },
        "name": "猜下一个进球方式"
      },
      "FTSTN": [{
        "btn": {
          "410": "有进球",
          "418": "无进球"
        },
        "name": "10分钟前是否有下一个进球"
      }, {
        "btn": {
          "411": "有进球",
          "419": "无进球"
        },
        "name": "20分钟前是否有下一个进球"
      }, {
        "btn": {
          "412": "有进球",
          "420": "无进球"
        },
        "name": "30分钟前是否有下一个进球"
      }, {
        "btn": {
          "413": "有进球",
          "421": "无进球"
        },
        "name": "40分钟前是否有下一个进球"
      }, {
        "btn": {
          "414": "有进球",
          "422": "无进球"
        },
        "name": "50分钟前是否有下一个进球"
      }, {
        "btn": {
          "415": "有进球",
          "423": "无进球"
        },
        "name": "60分钟前是否有下一个进球"
      }, {
        "btn": {
          "416": "有进球",
          "424": "无进球"
        },
        "name": "70分钟前是否有下一个进球"
      }, {
        "btn": {
          "417": "有进球",
          "425": "无进球"
        },
        "name": "80分钟前是否有下一个进球"
      }],
      "BSKRFSF": {
        "btn": {
          "36": shot.host + ((shot.handicap >= 0) ? '+' + shot.handicap : shot.handicap),
          "37": shot.guest + ((shot.handicap < 0) ? (shot.handicap + '').replace('-', '+') : "-" + shot.handicap)
        },
        "name": "让分猜" + shot.periodMap[shot.period] + "输赢"
      },
      "BSKDXF": {
        "btn": {
          "34": "大于 " + shot.handicap,
          "35": "小于 " + shot.handicap
        },
        "name": shot.periodMap[shot.period] + "总分猜大小" //下半场（包含加时赛）
      },
      "BSKSF": {
        "btn": {
          "1": shot.host + "胜",
          "3": shot.guest + "胜"
        },
        "name": "猜" + shot.periodMap[shot.period] + "输赢"
      },
      "BSKZFJO": {
        "btn": {
          "32": "单数",
          "33": "双数"
        },
        "name": shot.periodMap[shot.period] + "总比分猜单双"
      },
      "BSKFJO": [{
        "btn": {
          "44": shot.host + "单数",
          "45": shot.host + "双数"
        },
        "name": shot.periodMap[shot.period] + "主队得分猜单双"
      }, {
        "btn": {
          "46": shot.guest + "单数",
          "47": shot.guest + "双数"
        },
        "name": shot.periodMap[shot.period] + "客队得分猜单双"
      }],
      "BSKBQC": {
        "btn": {
          "20": "胜胜",
          "22": "胜负",
          "23": "平胜",
          "25": "平负",
          "26": "负胜",
          "28": "负负"
        },
        "name": "猜半场及全场赛果（全场含加时）"
      },
      "BSKSY14": [{
        "btn": {
          "300": "1-2分",
          "301": "3-6分",
          "302": "7-9分",
          "303": "10-13分",
          "304": "14-16分",
          "305": "17-20分",
          "306": "21分及以上"
        },
        "name": "猜全场比赛" + shot.host + "净胜分"
      }, {
        "btn": {
          "307": "1-2分",
          "308": "3-6分",
          "309": "7-9分",
          "310": "10-13分",
          "311": "14-16分",
          "312": "17-20分",
          "313": "21分及以上"
        },
        "name": "猜全场比赛" + shot.guest + "净胜分"
      }],
      "BSKSY7": {
        "btn": {
          "250": "1-5分",
          "251": "6-10分",
          "252": "11-15分",
          "253": "16-20分",
          "254": "21-25分",
          "255": "26-30分",
          "256": "31分及以上"
        },
        "name": "猜全场比赛净胜分"
      },
      "BSKF10": {
        "btn": {
          "201": shot.host,
          "202": shot.guest,
          "207": "均不"
        },
        "name": shot.periodMap[shot.period] + "先到10分的球队是？"
      },
      "BSKF15": {
        "btn": {
          "203": shot.host,
          "204": shot.guest,
          "207": "均不"
        },
        "name": shot.periodMap[shot.period] + "先到15分的球队是？"
      },
      "BSKF20": {
        "btn": {
          "205": shot.host,
          "206": shot.guest,
          "207": "均不"
        },
        "name": shot.periodMap[shot.period] + "先到20分的球队是？"
      },
      "BSKMT": {
        "btn": {
          "38": "加时",
          "39": "不加时"
        },
        "name": "本场比赛是否会加时？"
      }
    }
    return shot;
  },

  /**
   * [ptionName 通过传入的选项内容进行处理模拟实现非格式化的选项]
   * @param  {[type]} playtypes [选项的内容]
   * @return {[type]}           [返回一个未处理完整的选项数据]
   */
  btnContains: function(playtypes, _message) {
    let ptionDate = [],
    counterBtn = -1;
    playtypes.forEach(function(item, k) {
      let shot = this.btnMapping(_message, item, _message); //初始化数据
      try {
        item.optionId.match(/@(\d+)#/g).toString(); //得到要传入的编号
      } catch (e) {
        throw new Error('' + k + '选项出现未知错误~~');
      }
      let data = {},
      dataArr = [],
      playtypeCode = item.playtypeCode, //得到玩法的code
      optionNames = item.optionId.match(/@(\d+)#/g).toString().replace(/[@#]/g, '').split(','), //得到要传入的编号
      optionCont = shot.data[playtypeCode]; //得到丽霞的配置bitton项是个集合
      data.sp = item.sp; //赔率
      data.optionId = item.optionId; //得到id
      data.handicap = '';
      data.betLimit = item.betLimit; //限定
      data.optionName = '';
      data.sortFlag = k;
      if (optionCont.length > 1) { // 证明是多个 要判断
        data = [];
        let optionData = {},
        optionData2 = {};
        optionData.optionId = '';
        optionData.sp = '';
        optionData.handicap = ''; //盘口
        optionData.optionName = '';
        optionData2.optionId = '';
        optionData2.sp = '';
        optionData2.optionName = '';
        optionData2.handicap = ''; //盘口
        optionData2.betLimit = '' //限定
        optionData.betLimit = '';

        optionCont.forEach(function(btns, i, input) { //遍历判断丽霞写的初始化数据
          optionNames.forEach(function(names, index, input) {
            //得到以逗号隔开的btn的名字
            if (btns.btn[names]) {
              //去匹配的初始化数据 有的话就添加
              if (optionData.playtypeName && optionData.playtypeName != btns.name) {
                // 换命令了 要返回一个新的data
                if (optionData2.playtypeName && optionData2.playtypeName != btns.name) {
                  dataArr.push(optionData2);
                  optionData2.sortFlag = k;
                  optionData2 = {};
                  optionData2.optionId = '';
                  optionData2.sp = '';
                  optionData2.optionName = '';
                  optionData2.handicap = ''; //盘口
                  optionData2.betLimit = '' //限定
                }
                optionData2.optionId += ',' + item.optionId.split(',')[index];
                optionData2.sp += ',' + item.sp.split(',')[index];
                optionData2.playtypeName = btns.name; //"玩法名称1"
                optionData2.optionName += ',' + btns.btn[names];
                optionData2.handicap = item.handicap; //盘口
                optionData2.betLimit += ',' + item.betLimit.split(',')[index]; //限定
                if ((input.length) % 2 == 0 || input.length - 1 == index) {
                  dataArr.push(optionData2);
                  optionData2.sortFlag = k;
                }

              } else {
                // 第一次得到的data
                //  得到 option id
                optionData.sortFlag = k;
                optionData.optionId += ',' + item.optionId.split(',')[index];
                optionData.sp += ',' + item.sp.split(',')[index];
                optionData.playtypeName = btns.name; //"玩法名称1"
                optionData.optionName += ',' + btns.btn[names];
                optionData.handicap = item.handicap; //盘口
                optionData.betLimit += ',' + item.betLimit.split(',')[index]; ///限定
              }
            }

          });
        });
        data.push(optionData);
        let obj = {};
        for (let i = 0; i < dataArr.length; i++) {
          let temp = dataArr[i].optionId;
          if (obj[temp] == temp) {
            dataArr.splice(i, 1);
            i--;
          }
          obj[temp] = temp;
        }
        obj = null;
        dataArr.forEach(function(item, i) {
          data.push(item);
        })

      } else { //单个可以直接取
        data.playtypeName = optionCont.name; //"玩法名称1"
        optionNames.forEach(function(ite, j, input) {
          //得到以逗号隔开的btn的名字
          data.optionName += ',' + optionCont.btn[ite];
          data.handicap = item.handicap; //盘口

        })

      }
      ptionDate.push(data);
    }, this);
    return ptionDate;
  },
  /**
   * [formateOption 通过传入的选项内容进行处理模拟实现格式化的选项]
   * @param  {[type]} playtypes [选项的内容]
   * @return {[type]}           [返回一个处理完整的选项数据]
   */
  formateOption: function formateOption(playtypes, _message) {
    let tempAry = this.btnContains(playtypes, _message),
    tempRetu = [];
    tempAry.forEach(function(items, index, input) {
      try {
        Object.prototype.toString.call(items); //得到要传入的编号
      } catch (e) {
        throw new Error('' + index + '比赛问题出现未知错误~~');
      }
      if (Object.prototype.toString.call(items) == '[object Array]') {
        //这个是多个情况 需要解析
        items.forEach(function(item, index) {
          tempRetu.push(item);
        })

      } else { // 单个情况
        tempRetu.push(items);
      }
    });
    tempAry = null;
    tempRetu.forEach(function(items) {
      if (/全场先到20分的球队是？+/.test(items.playtypeName) && !_message.handicapStatus) {
        var optionName = items.optionName.replace(/^,|,$/).split(','),
          optionId = items.optionId.replace(/^,|,$/).split(',');
        optionName.forEach(function(item, index) {
          if (/均不/.test(item)) {
            optionId.splice(index, 1)
          }

        })
        items.optionId = optionId.toString();
        items.optionName = items.optionName.replace(/,均不|均不,/g, '')
      }
    })

    return tempRetu;
  },
  /**
   * [addAttr 给从websket得到初始化的jsondata数据加映射属性]
   * @param {[object]} data [得到json数据]
   */
  addAttr: function(data) {
    if(!data)return
    data.eventType = {
      '1': 'goal',
      '2': 'penalty',
      '3': 'yellow-card',
      '4': 'red-card',
      '5': 'own',
      '6': 'free-kick',
      '7': 'substitution',
      '8': 'Two-yellow-penalty',
      9: 'begin',
      10: 'half-time',
      11: 'finish'
    };
    data.footSrc = {
      '5': '上半场',
      '6': '下半场'
    };
    data.teamScr = {
      '1': '主队',
      '2': '客队'
    };
    data.scoreScr = {
      '0': '第一节',
      '1': '第二节',
      '2': '半场',
      '3': '第三节',
      '4': '第四节',
      '5': '加时1',
      '6': '加时2',
      '7': '加时3',
      '8': '加时4',
      '9': '加时5',
      '10': '加时6',
      '11': '加时7',
      '12': '加时8',
      '13': '加时9',
      '14': '加时10',
      '15': '加时11',
      '16': '加时12',
      '17': '加时13',
      '18': '加时14',
      '19': '加时15',
      '20': '加时16'
    };
    data.sectionNum = {
      '0': '全场',
      '1': '第一节',
      '2': '第二节',
      '3': '第三节',
      '4': '第四节',
      '5': '半场',
      '6': '暂停',
      '7': '加时1',
      '8': '加时2',
      '9': '加时3',
      '10': '加时4',
      '11': '加时5',
      '12': '加时6',
      '13': '加时7',
      '14': '加时8',
      '15': '加时9',
      '16': '加时10',
      '17': '加时11',
      '18': '加时12',
      '19': '加时13',
      '20': '加时14'
    };
    return data;

  },
  /**
   * [myReplace 去掉开头是逗号的方法]
   * @param  {[String]} str [要去开头空格的]
   * @return {[type]}     [返回的是一个去开头，的字符串]
   */
  myReplace: function(str) {
    if (!str) {
      return
    }
    return str.replace(/(^,| +,)/, '');
  },

  /**
   * [matchTp 判断比赛的标识 关于滚球的]
   * @param  {[type]} str [传入的是一个比赛的标识符]
   * @return {[type]}     [返回的类名]
   */
  matchTp: function matchTp(str) {
    let temp = null;
    switch (str) {
      case '0':
        return {
          class: 'match-flag',
          contents: '未开赛'
        };
      case '1':
        return {
          class: 'match-flag  conduct ',
          contents: '滚球盘即将开始'
        };
      case '2':
        return {
          class: 'match-flag  off-up',
          contents: '比赛中'
        };
      default:
        return {
          class: 'match-flag',
          contents: '比赛结束'
        };
    }

  },
  /**
   * [optionName 获取一个对象 是玩法的对象]
   * @param  {[type]} obj [传入一个逗对象号隔开的字符串]
   * @return {[type]}     [返回的是一个数组]
   */
  strToAry: function(obj, flag) {
    let _result = {};
    for (let item in obj) {
      //betLimit optionId optionName sp
      if (/(betLimit|optionId|optionName|sp)/g.test(item)) {
        if (obj[item].lastIndexOf(',') > 0 && obj[item].lastIndexOf(',') < obj[item].length) {
          if (flag) {
            _result[item] = obj[item].split(',');
            if (_result[item].length == 2 || _result[item].length == 3) {
              _result[item].reverse();
            }
          } else {
            _result[item] = obj[item].split(',');
          }
        }
      }
    }
    return _result;
  },
  /**
   * [countButton 计算button的个数]
   * @param  {[type]} obj [传入的一个对象]
   * @param  {[flag]} obj [//为了休闲的按钮的支持率作标志]
   * @return {[type]}     [返回一个对象 两个属性一一个大button的个数和一个小button的个数]
   */
  countButton: function(obj, flag) {
    let temp = {
      'bigBt': {
        count: 0,
        countTatol: -1,
        item: {},
        items: [],
        className: []
      },
      'smallBt': {
        count: 0,
        countTatol: -1,
        item: {},
        items: []
      }
    },
    optionL = null;
    temp.flag = flag ? flag : ''; //为了休闲的按钮的支持率作标志
    if (!obj) {
      return temp;
    }
    //格式化符合标准的数据
    obj.forEach(function(item, index, input) {
      item.optionId = this.myReplace(item.optionId);
      item.optionName = this.myReplace(item.optionName);
      item.sp = this.myReplace(item.sp);
      item.betLimit = this.myReplace(item.betLimit);
    }, this);
    obj.map(function(item, index) {
      optionL = this.strToAry(item).optionName; //返回的是一个对象数组counterBtn=-1;
      if (!optionL) {return temp};
        item.countTatol = [];
        item.classNames = [];
      this.classify(optionL.length);
      //bigBt:2,smallBt:''
      if(this.classifyDetail.bigBt&&this.classifyDetail.smallBt){
        //混合
        optionL.forEach(function(ite,i) {
          if(i<=this.classifyDetail.bigBt*2-1){
            item.countTatol.push(temp.bigBt.count++);
            item.classNames.push('');
          }else{
            item.countTatol.push(temp.bigBt.count++);
            item.classNames.push('small');
          }
        }.bind(this))
          temp.bigBt.className.push('selection');
          temp.bigBt.item['' + index + ''] = item;
          temp.bigBt.items.push(item);
      }else if(this.classifyDetail.bigBt&&!this.classifyDetail.smallBt){
        //单个大的
        optionL.forEach(function() {
          item.countTatol.push(temp.bigBt.count++);
          item.classNames.push('');
        })
          temp.bigBt.className.push('selection');
          temp.bigBt.item['' + index + ''] = item;
          temp.bigBt.items.push(item);
      }else{
        //单个小的
        optionL.forEach(function() {
          item.countTatol.push(temp.bigBt.count++);
          item.classNames.push('small')
        })
          temp.bigBt.className.push('selection');
          temp.bigBt.item['' + index + ''] = item;
          temp.bigBt.items.push(item);
      }
    }.bind(this))
    return temp;
  },
  /*合适话使用bton*/
  classify:function(num) {
    if(num%3==0){
       this.classifyDetail={bigBt:'',smallBt:num/3}
    }else{
      if(num==2||num==4){
         this.classifyDetail={bigBt:num,smallBt:''}
      }
      let mulitump=Math.floor(num/3);
       this.recursionBtn(num,mulitump);
    }
  },
   /*合适话使用bton*/
  recursionBtn:function (num,mulitump){
    if(mulitump==0)return
    if ((num-(3*mulitump))%2==0&&num!=0&&num%(3*mulitump)!=0) {
      this.classifyDetail={bigBt:((num-(3*mulitump)))/2,smallBt:mulitump}
      }else{
        this.recursionBtn(num,--mulitump)
      }
  },
  /**
   * [myReduce 把数组通过加工 变成数值 用于计算总分数]
   * @param  {[Array]} ary [要计算的数组]
   * @return {[number]}  [返回的 计算后的值]
   */
  myReduce: function strToEval(ary, str) {
    return ary.reduce(function(preValue, curValue, index, array) {
      if (index == 2 && str) {
        return preValue + 0;
      }
      return preValue + curValue;
    });
  },
  /**
   * [rateSupport 用于计算赔率的方法 传入的sp的集合]
   * @param  {[Array]} items [传入的sp的集合]
   * @return {[Number]}       [返回的是一个返还率]
   */
  rateSupport: function rateSupport(ary) {
    let temp = ary.reduce(function(preValue, curValue, index, array) {
      if (index === 1) preValue = 1 / preValue;
      return preValue + 1 / curValue;
    });
    return 1 / temp;
  },
  /**
  *
  *
  */
  timeDifference: function timeDifference(_this,elapseTime,sectionNum,type,paused){
    let prevTime=null,
        nextTimer=null,
        nowMilliseconds=null,
        nowTime=null,
        timeDif=null,
        that=this;
        if(_this.timer)clearInterval(_this.timer)
        if(paused==1) return
    _this.timer=setInterval(function(){
    //计算毫秒比较准确
      nowTime=new Date();
      nowMilliseconds=nowTime.getTime();
      if(!prevTime&&!nextTimer){
        prevTime=nowMilliseconds;
        timeDif=1;
      }else if(nowMilliseconds>prevTime){
        //走正常的比交流程
          timeDif=Math.round((nowMilliseconds-prevTime)/1000/60);
          prevTime=nowMilliseconds;
          timeDif=1;
      }
      elapseTime=that.addInnerHtml.call(that,type,elapseTime,_this,timeDif,sectionNum)
    },1000*60)

  },
  clearTimer:function(timer,elapseTime,type){
    if(type==0&&elapseTime<=0){
      clearInterval(timer)
      return 0
    }else if(type==1&&elapseTime>=90){
       clearInterval(timer)
       return 90
    }
    return elapseTime
  },
  addInnerHtml:function(type,elapseTime,_this,nowelapseTime,sectionNum){
    if(type===0){
      elapseTime-=nowelapseTime
    }else{
      elapseTime+=nowelapseTime
      if(sectionNum=='上半场'){
        if(elapseTime>=45){
           elapseTime="45'+"
           clearInterval(_this.timer)
            _this.refs.timeDifference.innerHTML=sectionNum+'  '+elapseTime;
            return
        }
      }else{
        if(elapseTime>=90){
           elapseTime="90'+"
           clearInterval(_this.timer)
            _this.refs.timeDifference.innerHTML=sectionNum+'  '+elapseTime;
            return
        }

      }
    }
      elapseTime= this.clearTimer(_this.timer,elapseTime,type)
      elapseTime=Math.floor(elapseTime)
      try{
         _this.refs.timeDifference.innerHTML=sectionNum+'  '+elapseTime+"'";
      }catch(e){
           clearInterval(_this.timer)
      }
     return elapseTime;
  },
  isTagNameB:function(e,direction,tagName){
    let oLi=null;
     if(direction=='next'){
      if(e.target.tagName==tagName){
        let Oi=this.parentEle(e.target,"i");
        oLi=this.prev(Oi);
      }else{
        oLi=this.prev(e.target);
      }
    }else{
      if(e.target.tagName==tagName){
        let Oi=this.parentEle(e.target,"i");
        oLi=this.next(Oi);
      }else{
        oLi=this.next(e.target);
      }
     
    }
    return oLi;

  },
  filterBtn:function filterBtn(targetArr,index){
      let strName=targetArr[index];
          targetArr[index]=targetArr[index+1];
          targetArr[index+1]=strName;
    return targetArr
  }
}