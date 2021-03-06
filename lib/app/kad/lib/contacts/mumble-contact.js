/*
 
This file is part of Mumble application. 
Mumble is an open source project to create a real time communication system for humans and machines. 

Mumble is a free software: you can redistribute it and/or modify it under the terms of the GNU General Public License 
as published by the Free Software Foundation, either version 3.0 of the License, or (at your option) any later version.

Mumble is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of 
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with Mumble software.  
If not, see http://www.gnu.org/licenses/.
 
-------------------------------------------------------------------------------------------------------------------------
Author: Tibor Zsolt Pardi 
Copyright (C) 2016 The Mumble software development team
-------------------------------------------------------------------------------------------------------------------------
  
*/


/**
 * Implementation is based on https://github.com/kadtools/kad 
 * Huge thanks to Gordon Hall https://github.com/gordonwritescode the author of kad library!
 * @module kad
 * @license GPL-3.0
 * @author Gordon Hall gordon@gordonwritescode.com
 */


'use strict';

var assert = require('assert');
var Contact = require('../contact');
var inherits = require('util').inherits;
var utils = require('../utils');

var MIN_KEY_LEN = 64;

/**
 * Represent a contact (or peer)
 * @constructor
 * @extends {Contact}
 * @param {Object} options
 * @param {String} options.address - IP or hostname
 * @param {Number} options.port - Listening port
 * @param {Number} options.publickey - Contacts public key
 */
function MumbleContact(options) {
    if (!(this instanceof MumbleContact)) {
        return new MumbleContact(options);
    }

    assert(typeof options === 'object', 'Invalid options were supplied: options != object');
    assert(typeof options.address === 'string', 'Invalid address was supplied options.address != string');
    assert(typeof options.port === 'number', 'Invalid port was supplied options.port != number');

    this.publickey = "";
    this.address = options.address;
    this.port = options.port;

    if (options.publickey) {
        assert(typeof options.publickey === 'string', 'Invalid public key was supplied');
        var str = options.publickey.trim();
        assert(str.length > 64, 'Invalid public key was supplied');
        this.publickey = str;
    }

    Contact.call(this, options);
}

inherits(MumbleContact, Contact);

/**
* Generate a NodeID by taking the SHA1 hash of the address and port
* @private
*/
MumbleContact.prototype._createNodeID = function () {
    return utils.createID(this.toString());
};

/**
* Generate a user-friendly string for the contact
*/
MumbleContact.prototype.toString = function () {
    if (this.publickey) {
        return this.publickey;
    }
    else {
        return this.address + ':' + this.port;
    }
};

module.exports = MumbleContact;

