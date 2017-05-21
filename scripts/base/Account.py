#-*- coding: utf-8 -*-
import KBEngine
from KBEDebug import *
from Machine import Machine

class Account(KBEngine.Proxy):
	def __init__(self):

		KBEngine.Proxy.__init__(self)
		self.money
		self.barNum
		self.sevenNum
		self.starNum
		self.watermelonNum
		self.bellNum
		self.snakemelonNum
		self.orangeNum
		self.appleNum
		self.winScore
		self.resultItem = ''
		self.betPaid
		self.bigSmall = 0
		self.machine = Machine()

	def lessMoney(self, money):
		if money >= 0 and self.money >= money:
			self.money -= money
		else:
			raise ValueError("輸入金額錯誤")

	def addMoney(self, money):
		if money >= 0:
			self.money += money
		else:
			raise ValueError("輸入金額錯誤")

	def depositOne(self):
		ERROR_MSG('depositOne called: '+str(self.money))
		self.addMoney(1000)

	def depositTwo(self):
		ERROR_MSG('depositTwo called: '+str(self.money))
		self.addMoney(2000)

	def pressBarButton(self):
		self._clearBeforePress()
		if self.winScore == 0 and self.money >=5 and self.barNum<99:
			self.lessMoney(5)
			self.betPaid += 5
			self.barNum += 1

	def pressSevenButton(self):
		self._clearBeforePress()
		if self.winScore == 0 and self.money >=5 and self.sevenNum<99:
			self.lessMoney(5)
			self.betPaid += 5
			self.sevenNum += 1

	def pressStarButton(self):
		self._clearBeforePress()
		if self.winScore == 0 and self.money >=5 and self.starNum<99:
			self.lessMoney(5)
			self.betPaid += 5
			self.starNum += 1

	def pressWatermelonButton(self):
		self._clearBeforePress()
		if self.winScore == 0 and self.money >=5 and self.watermelonNum<99:
			self.lessMoney(5)
			self.betPaid += 5
			self.watermelonNum += 1

	def pressBellButton(self):
		self._clearBeforePress()
		if self.winScore == 0 and self.money >=5 and self.bellNum<99:
			self.lessMoney(5)
			self.betPaid += 5
			self.bellNum += 1

	def pressSnakemelonButton(self):
		self._clearBeforePress()
		if self.winScore == 0 and self.money >=5 and self.snakemelonNum<99:
			self.lessMoney(5)
			self.betPaid += 5
			self.snakemelonNum += 1

	def pressOrangeButton(self):
		self._clearBeforePress()
		if self.winScore == 0 and self.money >=5 and self.orangeNum<99:
			self.lessMoney(5)
			self.betPaid += 5
			self.orangeNum += 1

	def pressAppleButton(self):
		self._clearBeforePress()
		if self.winScore == 0 and self.money >=5 and self.appleNum<99:
			self.lessMoney(5)
			self.betPaid += 5
			self.appleNum += 1

	def pressWinScoreToMoneyButton(self):
		self._clearBeforePress()
		if self.winScore >0:
			self.addMoney(self.winScore)
			self.winScore = 0

	def pressStartButton(self):
		self._clearBeforePress()
		self.machine.start(self)

	def pressBigButton(self):
		self._clearBeforePress()
		if self.winScore >0:
			self.bigSmall = 2
			self.machine.bet_big_small(self)

	def pressSmallButton(self):
		self._clearBeforePress()
		if self.winScore >0:
			self.bigSmall = 1
			self.machine.bet_big_small(self)

	def pressClearButton(self):
		self._clearBeforePress()
		self.barNum = 0
		self.sevenNum = 0
		self.starNum = 0
		self.watermelonNum = 0
		self.bellNum = 0
		self.snakemelonNum = 0
		self.orangeNum = 0
		self.appleNum = 0
		self.addMoney(self.betPaid)
		self.betPaid = 0

	def _clearBeforePress(self):
		self.resultItem = ''
		self.bigSmall = 0

	def getAccountInfo(self):
		accountInfo = {'money':self.money, 'barNum':self.barNum, 'sevenNum':self.sevenNum, 'starNum':self.starNum,
						'watermelonNum':self.watermelonNum, 'bellNum':self.bellNum,'snakemelonNum':self.snakemelonNum,
						'orangeNum':self.orangeNum, 'appleNum':self.appleNum, 'winScore':self.winScore,
						'resultItem':self.resultItem, 'bigSmall':self.bigSmall}
		self.writeToDB()
		self.client.onGetAccountInfo(accountInfo)

	def onTimer(self, id, userArg):
		"""
		KBEngine method.
		使用addTimer后， 当时间到达则该接口被调用
		@param id		: addTimer 的返回值ID
		@param userArg	: addTimer 最后一个参数所给入的数据
		"""
		DEBUG_MSG(id, userArg)

	def onEntitiesEnabled(self):
		"""
		KBEngine method.
		该entity被正式激活为可使用， 此时entity已经建立了client对应实体， 可以在此创建它的
		cell部分。
		"""
		INFO_MSG("account[%i] entities enable. mailbox:%s" % (self.id, self.client))

	def onLogOnAttempt(self, ip, port, password):
		"""
		KBEngine method.
		客户端登陆失败时会回调到这里
		"""
		INFO_MSG(ip, port, password)
		return KBEngine.LOG_ON_ACCEPT

	def onClientDeath(self):
		"""
		KBEngine method.
		客户端对应实体已经销毁
		"""
		DEBUG_MSG("Account[%i].onClientDeath:" % self.id)
		self.destroy()
