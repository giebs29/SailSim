
import webbrowser


def trueWindAngle(heading,wind):
    if wind == 0:
        wind == 360
    twa = abs(wind-heading)
    if twa > 180:
        twa = 180 - (twa - 180)
    return twa

mile = 0.0184122665187
lat = 46.7808831
lon = -92.0889777
lon = lon + (lon*0.0001999)

zoom = 11
link = '''https://www.google.com/maps/place/{0},{1}/@{2},{3},{4}z'''.format(lat, lon,lat,lon,zoom)

##webbrowser.open(link)
