class AccountInfo(list):

    def __init__(self):
        list.__init__(self)

    def as_dict(self):
        data = {
            "id"		: self[0],
            "memberType": self[1],
            "money"		: self[2],
        }
        return data

    def create_from_dict(self, dict_data):
        self.extend([dict_data["id"], dict_data["memberType"], dict_data["money"]])
        return self
