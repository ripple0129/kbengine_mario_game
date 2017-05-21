# -*- coding: utf-8 -*-
import random
from Account import *
from Machine import *
from KBEDebug import *
import configparser
import os

class Machine():

    __reward_rate_dict = None
    __result_rate_dict = None
    __result_refer_dict = None
    __result_refer_list = None
    bet_dict = None

    def __init__(self):
        self.config_path = 'scripts/config.ini'
        self.bet_dict = self._reset_bet_dict()
        self._load_reward_rate_dict()
        self._load_result_rate_dict()
        self.__result_refer_dict = dict()
        self.__result_refer_list = list()
        self._generate_result_reference()

    def start(self, account_entity):
        if account_entity.winScore > 0 :
            self._win_score_to_money(account_entity)
        self._generate_bet_dict(account_entity)
        if self._is_bet_dict_not_empty() and self._is_money_enough(account_entity):
            self._consume_money(account_entity)
            account_entity.resultItem = self._generate_result_item()
            if self._is_bingo(account_entity.resultItem):
                self._calculate_win_score(account_entity)
            else:
                if account_entity.resultItem == "left_once_again":
                    self._clear_right_bet(account_entity)
                if account_entity.resultItem == "right_once_again":
                    self._clear_left_bet(account_entity)

    def bet_big_small(self, account_entity):
        result = random.randint(1, 2)
        if account_entity.bigSmall == result:
            account_entity.winScore = account_entity.winScore * 2
        else:
            account_entity.winScore = 0
            account_entity.bigSmall = result

    def _consume_money(self, account_entity):
        account_entity.money = account_entity.money - self._conculate_cost(account_entity) + account_entity.betPaid
        account_entity.betPaid = 0

    def _conculate_cost(self, account_entity):
        return (account_entity.barNum + account_entity.sevenNum + account_entity.starNum + account_entity.watermelonNum+
                account_entity.bellNum + account_entity.snakemelonNum + account_entity.orangeNum + account_entity.appleNum ) *5

    def _is_money_enough(self, account_entity):
        return (account_entity.money - self._conculate_cost(account_entity) + account_entity.betPaid) >=0

    def _is_bet_dict_not_empty(self):
        is_not_empty = False
        for key in self.bet_dict:
            if self.bet_dict[key] > 0:
                is_not_empty = True
        return is_not_empty

    def _win_score_to_money(self, account_entity):
        account_entity.money += account_entity.winScore
        account_entity.winScore = 0

    def _clear_right_bet(self, account_entity):
        account_entity.bellNum = 0
        account_entity.snakemelonNum = 0
        account_entity.orangeNum = 0
        account_entity.appleNum = 0

    def _clear_left_bet(self, account_entity):
        account_entity.sevenNum = 0
        account_entity.starNum = 0
        account_entity.watermelonNum = 0
        account_entity.barNum = 0

    def _reset_bet_dict(self):
        return {'apple': 0, 'little_apple': 0, 'orange': 0, 'little_orange': 0, 'snakemelon': 0,
                'little_snakemelon': 0, 'bell': 0, 'little_bell': 0,'watermelon': 0,
                'little_watermelon': 0, 'star': 0, 'little_star': 0, 'seven': 0,
                'little_seven': 0, 'bar': 0, 'little_bar': 0}

    def _load_reward_rate_dict(self):
        config = configparser.ConfigParser()
        config.read(self.config_path)
        d = dict(config._sections['RewardRate'])
        ERROR_MSG(d)
        for key in d:
            d[key] = int(d[key])
        self.__reward_rate_dict = d

    def _load_result_rate_dict(self):
        config = configparser.ConfigParser()
        config.read(self.config_path)
        d = dict(config._sections['WinRate'])
        ERROR_MSG(d)
        for key in d:
            d[key] = int(float(d[key].replace('%',''))*10)
        self.__result_rate_dict = d
        self._check_reward_rate_amount()

    def _check_reward_rate_amount(self):
        amount = 0
        for key in self.__result_rate_dict:
            amount += self.__result_rate_dict[key]
        if amount == 1000:
            return True
        raise ValueError('the rate amount should be 100%')

    def _generate_result_reference(self):
        amount = 0
        for key in self.__result_rate_dict:
            amount += self.__result_rate_dict[key]
            self.__result_refer_dict[amount] = key
            self.__result_refer_list.append(amount)

    def _generate_result_item(self):
        result_number = int(random.uniform(0, 1000))
        for number in self.__result_refer_list:
            if result_number < number:
                return self.__result_refer_dict[number]

    def _is_bingo(self, result_item):
        return self.bet_dict[result_item] != 0

    def _calculate_win_score(self, account_entity):
        account_entity.winScore = self.bet_dict[account_entity.resultItem] \
        * self.__reward_rate_dict[account_entity.resultItem] * 5


    def _generate_bet_dict(self, account_entity):
        self.bet_dict = {'apple': account_entity.appleNum, 'orange': account_entity.orangeNum, 'snakemelon': account_entity.snakemelonNum,
                         'bell': account_entity.bellNum, 'watermelon': account_entity.watermelonNum, 'star': account_entity.starNum,
                         'seven': account_entity.sevenNum, 'bar': account_entity.barNum,'little_apple': account_entity.appleNum,
                         'little_orange': account_entity.orangeNum, 'little_snakemelon': account_entity.snakemelonNum,
                         'little_bell': account_entity.bellNum, 'little_watermelon': account_entity.watermelonNum, 'little_star': account_entity.starNum,
                         'little_seven': account_entity.sevenNum, 'little_bar': account_entity.barNum, 'left_once_again':0, 'right_once_again':0}


if __name__ == '__main__':
    machine = Machine()
    machine._load_result_rate_dict
    """
    player = Account()
    player.money = 10000
    player.appleNum = 1
    player.orangeNum = 1
    player.snakemelonNum = 1
    player.bellNum = 1
    player.watermelonNum = 1
    player.starNum = 1
    player.sevenNum = 1
    player.barNum = 1
    player.winScore = 0
    player.resultItem = ''
    player.bigSmall = '0'
    machine = Machine()
    machine.start(player)
    print(machine.bet_dict)
    print('resultItem: '+player.resultItem)
    print('winScore: '+str(player.winScore))
    print('money: '+str(player.money))
    """
