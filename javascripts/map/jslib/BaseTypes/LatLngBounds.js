﻿/*
* 经纬度bounds
*/

Atlas.LatLngBounds = Atlas.Class.extend({
    initialize: function (southWest, northEast) {	// (LatLng, LatLng) or (LatLng[])
        if (!southWest) { return; }

        var latlngs = northEast ? [southWest, northEast] : southWest;

        for (var i = 0, len = latlngs.length; i < len; i++) {
            this.extend(latlngs[i]);
        }
    },

    // extend the bounds to contain the given point or bounds
    extend: function (obj) { // (LatLng) or (LatLngBounds)
        if (typeof obj[0] === 'number' || obj instanceof Atlas.LatLng) {
            obj = Atlas.latLng(obj);
        } else {
            obj = Atlas.latLngBounds(obj);
        }

        if (obj instanceof Atlas.LatLng) {
            if (!this._southWest && !this._northEast) {
                this._southWest = new Atlas.LatLng(obj.lat, obj.lng, true);
                this._northEast = new Atlas.LatLng(obj.lat, obj.lng, true);
            } else {
                this._southWest.lat = Math.min(obj.lat, this._southWest.lat);
                this._southWest.lng = Math.min(obj.lng, this._southWest.lng);

                this._northEast.lat = Math.max(obj.lat, this._northEast.lat);
                this._northEast.lng = Math.max(obj.lng, this._northEast.lng);
            }
        } else if (obj instanceof Atlas.LatLngBounds) {
            this.extend(obj._southWest);
            this.extend(obj._northEast);
        }
        return this;
    },

    // extend the bounds by a percentage
    pad: function (bufferRatio) { // (Number) -> LatLngBounds
        var sw = this._southWest,
			ne = this._northEast,
			heightBuffer = Math.abs(sw.lat - ne.lat) * bufferRatio,
			widthBuffer = Math.abs(sw.lng - ne.lng) * bufferRatio;

        return new Atlas.LatLngBounds(
			new Atlas.LatLng(sw.lat - heightBuffer, sw.lng - widthBuffer),
			new Atlas.LatLng(ne.lat + heightBuffer, ne.lng + widthBuffer));
    },

    getCenter: function () { // -> LatLng
        return new Atlas.LatLng(
				(this._southWest.lat + this._northEast.lat) / 2,
				(this._southWest.lng + this._northEast.lng) / 2);
    },

    getSouthWest: function () {
        return this._southWest;
    },

    getNorthEast: function () {
        return this._northEast;
    },

    getNorthWest: function () {
        return new Atlas.LatLng(this._northEast.lat, this._southWest.lng, true);
    },

    getSouthEast: function () {
        return new Atlas.LatLng(this._southWest.lat, this._northEast.lng, true);
    },

    contains: function (obj) { // (LatLngBounds) or (LatLng) -> Boolean
        if (typeof obj[0] === 'number' || obj instanceof Atlas.LatLng) {
            obj = Atlas.latLng(obj);
        } else {
            obj = Atlas.latLngBounds(obj);
        }

        var sw = this._southWest,
			ne = this._northEast,
			sw2, ne2;

        if (obj instanceof Atlas.LatLngBounds) {
            sw2 = obj.getSouthWest();
            ne2 = obj.getNorthEast();
        } else {
            sw2 = ne2 = obj;
        }

        return (sw2.lat >= sw.lat) && (ne2.lat <= ne.lat) &&
				(sw2.lng >= sw.lng) && (ne2.lng <= ne.lng);
    },

    intersects: function (bounds) { // (LatLngBounds)
        bounds = Atlas.latLngBounds(bounds);

        var sw = this._southWest,
			ne = this._northEast,
			sw2 = bounds.getSouthWest(),
			ne2 = bounds.getNorthEast();

        var latIntersects = (ne2.lat >= sw.lat) && (sw2.lat <= ne.lat),
			lngIntersects = (ne2.lng >= sw.lng) && (sw2.lng <= ne.lng);

        return latIntersects && lngIntersects;
    },

    /**
    * APIMethod: toBBoxString
    * Bounds转成字符串
    */
    toBBoxString: function () {
        var sw = this._southWest,
			ne = this._northEast;
        return [sw.lng, sw.lat, ne.lng, ne.lat].join(',');
    },

    equals: function (bounds) { // (LatLngBounds)
        if (!bounds) { return false; }

        bounds = Atlas.latLngBounds(bounds);

        return this._southWest.equals(bounds.getSouthWest()) &&
		       this._northEast.equals(bounds.getNorthEast());
    }
});

//TODO International date line?

Atlas.latLngBounds = function (a, b) { // (LatLngBounds) or (LatLng, LatLng)
    if (!a || a instanceof Atlas.LatLngBounds) {
        return a;
    }
    return new Atlas.LatLngBounds(a, b);
};