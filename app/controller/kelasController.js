/*
 * File: app/controller/kelasController.js
 *
 * This file was generated by Sencha Architect version 3.1.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.2.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('SistemInformasiNilai.controller.kelasController', {
    extend: 'Ext.app.Controller',

    onPanelShow: function(component, eOpts) {
        Ext.getStore('JsonStoreKelas').load();
    },

    onBtnTambahKelas: function(button, e, eOpts) {
        Ext.widget('window_kelas').show();
    },

    onBtnEditKelas: function(button, e, eOpts) {
        var win = Ext.widget('window_kelas').show();
        var grid = Ext.ComponentQuery.query('#tabelKelas')[0];
        var selection = grid.getSelectionModel().getSelection()[0];

        win.down('form').loadRecord(selection);
        win.show();
    },

    onBtnWindowKelasSimpan: function(button, e, eOpts) {
            var win = button.up('window');
            var form = win.down('form');

            if(form.isValid()) {
                form.submit({
                url:'api/kelas/simpanKelas.php',
                success:function(a, response){
                    console.log(a);
                    console.log(response);
                    win.close();
                    Ext.MessageBox.show({
                                title:"Berhasil",
                                msg:response.result.message,
                                icon:Ext.MessageBox.INFO
                            });

                    Ext.ComponentQuery.query('#tabelKelas')[0].getSelectionModel().clearSelections();
                    Ext.ComponentQuery.query('#btnEditKelas')[0].setDisabled(true);
                    Ext.ComponentQuery.query('#btnHapusKelas')[0].setDisabled(true);
                    Ext.getStore('JsonStoreKelas').load();
        //             Ext.Ajax.request({
        //                 url: 'api/siswa/jumlahSiswa.php',
        //                 success: function(response) {
        //                     console.log(response.responseText);
        //                     response = Ext.decode(response.responseText);
        //                     console.log(response.message);
        //                     var jumlah = response.message;
        //                     Ext.ComponentQuery.query("#bykSiswa")[0].setText(jumlah);
        //                 }
        //             });
                },
                failure:function(a, response) {
                    //console.log("gagal");
                    Ext.MessageBox.show({
                        title:"Gagal",
                        msg:response.result.message,
                        icon:Ext.MessageBox.INFO
                    });
                }
            });
            }

    },

    onBtnHapusKelas: function(button, e, eOpts) {
        var hapus = function(btn) {
            if(btn == 'yes'){
                var grid = Ext.ComponentQuery.query('#tabelKelas')[0];
                var selection = grid.getSelectionModel().getSelection()[0];
                var id = selection.get('IDKelas_');

                if(selection) {
                    Ext.Ajax.request({
                        url:'api/kelas/hapusKelas.php',
                        params:{
                            IDKelas_:id
                        },
                        success:function(response, opts) {
                            response = Ext.decode(response.responseText);
                            if(response.success){
                                Ext.ComponentQuery.query('#tabelKelas')[0].getSelectionModel().clearSelections();
                                Ext.ComponentQuery.query('#btnEditKelas')[0].setDisabled(true);
                                Ext.ComponentQuery.query('#btnHapusKelas')[0].setDisabled(true);
                                Ext.getStore('JsonStoreKelas').load();
                            }else{
                                 Ext.MessageBox.show({
                                     title:'Peringatan',
                                     msg:response.message,
                                     buttons:Ext.MessageBox.OK,
                                     icon:Ext.MessageBox.INFO
                                 });
                            }
                        }
                    });
                }
            }
        };
        Ext.MessageBox.show({
            title:'Peringatan hapus',
            msg:"Apa yakin?",
            buttons: Ext.MessageBox.YESNO,
            icon:Ext.MessageBox.QUESTION,
            fn:hapus
        });

    },

    onBtnWindowKelasBatal: function(button, e, eOpts) {
        button.up('window').close();
    },

    onGridpanelSelectionChange: function(model, selected, eOpts) {
            Ext.ComponentQuery.query('#btnEditKelas')[0].setDisabled(false);
            Ext.ComponentQuery.query('#btnHapusKelas')[0].setDisabled(false);

            Ext.ComponentQuery.query('#tabelJurusan')[0].getSelectionModel().clearSelections();
            Ext.ComponentQuery.query('#btnEditJurusan')[0].setDisabled(true);
            Ext.ComponentQuery.query('#btnHapusJurusan')[0].setDisabled(true);
            Ext.getStore('JsonStoreJurusan').load();
    },

    init: function(application) {
        this.control({
            "#kelasjurPanel": {
                show: this.onPanelShow
            },
            "#btnTambahKelas": {
                click: this.onBtnTambahKelas
            },
            "#btnEditKelas": {
                click: this.onBtnEditKelas
            },
            "#btnWindowKelasSimpan": {
                click: this.onBtnWindowKelasSimpan
            },
            "#btnHapusKelas": {
                click: this.onBtnHapusKelas
            },
            "#btnWindowKelasBatal": {
                click: this.onBtnWindowKelasBatal
            },
            "#tabelKelas": {
                selectionchange: this.onGridpanelSelectionChange
            }
        });
    }

});