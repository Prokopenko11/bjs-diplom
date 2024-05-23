const logout = new LogoutButton;
logout.action = () => {
  ApiConnector.logout(response => {
    if (response.success) {
      location.reload();
      console.log('cool')
    }
  })
}

ApiConnector.current((response) => {
  if (response.success) {
    ProfileWidget.showProfile(response.data)
  }
})

const ratesBoard = new RatesBoard();
function getCurse() {
  ApiConnector.getStocks(response => {
    if (response.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    }
  })
}
getCurse();
setInterval(() => getCurse(), 60000)

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = data => {
  ApiConnector.addMoney(data, response => {
    if (response.success) {
      ProfileWidget.showProfile(response.data)
      moneyManager.setMessage(response.success, 'Пополнение баланса произошло успешно')
    } else {
      moneyManager.setMessage(response.success, response.error)
    }
  })
}

moneyManager.conversionMoneyCallback = data => {
  ApiConnector.convertMoney(data, response => {
    if (response.success) {
      ProfileWidget.showProfile(response.data)
      moneyManager.setMessage(response.success, 'Конвертация произошла успешно')
    } else {
      moneyManager.setMessage(response.success, response.error)
    }
  })
}

moneyManager.sendMoneyCallback = data => {
  ApiConnector.transferMoney(data, response => {
    if (response.success) {
      ProfileWidget.showProfile(response.data)
      moneyManager.setMessage(response.success, 'Перевод средств выполнен успешно')
    } else {
      moneyManager.setMessage(response.success, response.error)
    }
  })
}

const favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites(response => {
  if (response.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  }
})

favoritesWidget.addUserCallback = data => {
  ApiConnector.addUserToFavorites(data, response => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favoritesWidget.setMessage(response.success, 'Пользователь успешно добавлен в список избранных');
    } else {
      favoritesWidget.setMessage(response.success, response.error);
    }
  })
}

favoritesWidget.removeUserCallback = data => {
  ApiConnector.removeUserFromFavorites(data, response => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favoritesWidget.setMessage(response.success, 'Пользователь успешно удалён из избранных');
    } else {
      favoritesWidget.setMessage(response.success, response.error);
    }
  })
}