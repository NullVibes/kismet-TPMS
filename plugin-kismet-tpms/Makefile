# Our plugin directory name when we install
PLUGIN_NAME ?= kismet-tpms

# Look for the kismet source in /usr/src/kismet by default
KIS_SRC_DIR ?= /usr/src/kismet
KIS_INC_DIR ?= $(KIS_SRC_DIR)

BLDHOME	= .
top_builddir = $(BLDHOME)

# Try to include the base config
-include $(KIS_SRC_DIR)/Makefile.inc

# Set sane values if we don't have the base config
INSTALL ?= /usr/bin/install
plugindir ?= $(shell pkg-config --variable=plugindir kismet)
ifeq ("$(plugindir)", "")
	plugindir := "/usr/local/lib/kismet/"
	plugindirgeneric := 1
endif
INSTUSR ?= root
INSTGRP ?= root

# As we have no live code, all we need is the manifest.conf to "compile"
all:	manifest.conf

# We have no requirements for install or userinstall, we just copy our data
install:
ifeq ("$(plugindirgeneric)", "1")
	echo "No kismet install found in pkgconfig, assuming /usr/local"
endif

	mkdir -p $(DESTDIR)/$(plugindir)/$(PLUGIN_NAME)
	$(INSTALL) -o $(INSTUSR) -g $(INSTGRP) -m 444 manifest.conf $(DESTDIR)/$(plugindir)/$(PLUGIN_NAME)/manifest.conf

	mkdir -p $(DESTDIR)/$(plugindir)/$(PLUGIN_NAME)/httpd
	cp -r httpd/* $(DESTDIR)/$(plugindir)/$(PLUGIN_NAME)/httpd
	cp httpd/tpms_map_panel.html /usr/share/kismet/httpd/

userinstall:
	mkdir -p ${HOME}/.kismet/plugins/$(PLUGIN_NAME)
	$(INSTALL) manifest.conf $(HOME)/.kismet/plugins/$(PLUGIN_NAME)/manifest.conf

	mkdir -p ${HOME}/.kismet/plugins/$(PLUGIN_NAME)/httpd
	cp -r httpd/js/* $(HOME)/.kismet/plugins/${PLUGIN_NAME}/httpd/js
	cp httpd/tpms_map_panel.html /usr/share/kismet/httpd/


clean:
	@echo "Nothing to clean"

