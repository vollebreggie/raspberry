from lg import Remote

address = Remote.find_tvs(first_only=True)

remote = Remote(address)
# Pairing key will appear on screen
key = raw_input('Please enter pairing key: ')
remote.set_pairing_key(key)