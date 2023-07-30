# import numpy
# from hashlib import new
# from model.theta_oscillator_main2 import *
# import scipy.io.wavfile as wavy
# from model.feat_extr_nn2 import *
# import math
# from model.finding_len_wav_time import *
# # from model.train_neural_network import *
# from scipy.io import savemat
# # from model.write_xlsx import *
# from model.rep_pro_spu_rem import *


# def remove_elements(lst, k):
#     if len(lst) < k:
#         return lst
#     else:
#         return [lst[0]] + lst[k:]



# def for_single_file_including_original_boundaries(wave_files, minfreqs, maxfreqs, bandss, Q_values, center_frequencys, thresholds, N_bandss, actual_boundary):
#     pks, vals, val_ind, original_array = theta_oscillator_main(
#         wave_files, minfreqs, maxfreqs, bandss, Q_values, center_frequencys, thresholds, N_bandss)  # for test file
#     index_to_be_removed2 = []
#     index_to_be_removed_rep = []
#     index_to_be_removed = []
#     print("HII")
#     print("len of valley indices", len(val_ind))
#     # if len(val_ind) > actual_boundary+3:
#     print("wooh 0")
#     final_peaks_points1, final_valley_points1, ori_valley_points, index_to_be_removed = removing_spurious_peaks(
#         original_array, pks, vals)  # ,val_inda
#     print("wooh 1")
#     final_peaks_points, final_valley_points = removing_indexes_for_all_types(
#         index_to_be_removed, pks, vals)
#     print("wooh 2")

#     final_pks_points2, final_valley_points2, ori_valley_points2, index_to_be_removed2 = for_prolongation(
#         original_array, pks, vals)
#     print("wooh 3")

#     final_peaks_points3, final_valley_points3 = removing_indexes_for_all_types(
#         index_to_be_removed2, final_peaks_points, final_valley_points)

#     final_pks_points_rep, final_valley_points_rep, ori_valley_points_rep, index_to_be_removed_rep = for_repetation1(
#         original_array, pks, vals)
#     print("wooh 4")
#     final_peaks_points4, final_valley_points4 = removing_indexes_for_all_types(
#         index_to_be_removed_rep, final_peaks_points3, final_valley_points3)

#     final_peaks_points5, final_valley_points5, ori_valley_points_blo, index_to_be_removed_blo = removing_blocks(
#         original_array, pks, vals)

#     for i in range(0,pks):
#         print(original_array[i])
#     return pks, vals, index_to_be_removed2, index_to_be_removed_rep, index_to_be_removed_blo

#     # else:
#     #     return pks, vals, index_to_be_removed2, index_to_be_removed_rep, index_to_be_removed


# minfreq = 50  # 100    #50 #my 50
# maxfreq = 7500  # 5000    #7500 #my7500
# bands = 10  # 10    #20 for gammatone #my 10
# Q_value = 0.8  # Q-value of the oscillator, default = 0.5 = critical damping #my 0.8
# center_frequency = 5  # in Hz #my 5
# threshold = 0.025  # my 0.025
# N_bands = 30  # theta oscillator #my 30

# final_labels = []
# final_feats = []
# final_labels_pred = []
# final_feats_pred = []
# original_bound_count = 15 

# def get_output(wave_file, bound):

#     act_pks, act_vals, pro_ind, rep_ind, blo_ind = for_single_file_including_original_boundaries(
#         wave_file, minfreq, maxfreq, bands, Q_value, center_frequency, threshold, N_bands, bound)
#     # print("pro_ind", len(pro_ind), "rep_ind", len(rep_ind), len(act_pks), len(act_vals))
#     # return pro_ind, rep_ind, act_pks, act_vals
#     # prolongation, repetation, predicted boundaries
    
#     new_pro_ind = remove_elements(pro_ind,30)
#     print(new_pro_ind,pro_ind)
#     pro_ind = new_pro_ind

#     k1 = 10
#     new_rep_ind = remove_elements(rep_ind,k)
#     rep_ind = new_rep_ind

#     return len(pro_ind), len(rep_ind), len(blo_ind), len(act_pks)
    
    

# # if __name__ == "__main__":
#     # get_output("/home/harsha/Downloads/1.wav")

from hashlib import new
from model.theta_oscillator_main2 import *
import scipy.io.wavfile as wavy
from model.feat_extr_nn2 import *
import math
from model.finding_len_wav_time import *
# from model.train_neural_network import *
from scipy.io import savemat
# from model.write_xlsx import *
from model.rep_pro_spu_rem import *


def remove_elements(lst, k):
    output = []
    while lst:
        output.append(lst[0])
        lst = [x for x in lst if x > lst[0] + k]
    return output

def for_single_file_including_original_boundaries(wave_files, minfreqs, maxfreqs, bandss, Q_values, center_frequencys, thresholds, N_bandss, actual_boundary):
    pks, vals, val_ind, original_array = theta_oscillator_main(
        wave_files, minfreqs, maxfreqs, bandss, Q_values, center_frequencys, thresholds, N_bandss)  # for test file
    index_to_be_removed2 = []
    index_to_be_removed_rep = []
    index_to_be_removed = []

    print("HII model alt")
    # print("len of valley indices", len(val_ind))
    # if len(val_ind) > actual_boundary+3:
    print("wooh 0")
    final_peaks_points1, final_valley_points1, ori_valley_points, index_to_be_removed = removing_spurious_peaks(
        original_array, pks, vals)  # ,val_inda
    print("wooh 1")
    final_peaks_points, final_valley_points = removing_indexes_for_all_types(
        index_to_be_removed, pks, vals)
    print("wooh 2")

    final_pks_points2, final_valley_points2, ori_valley_points2, index_to_be_removed2 = for_prolongation(
        original_array, pks, vals)
    print("wooh 3")

    final_peaks_points3, final_valley_points3 = removing_indexes_for_all_types(
        index_to_be_removed2, final_peaks_points, final_valley_points)

    final_pks_points_rep, final_valley_points_rep, ori_valley_points_rep, index_to_be_removed_rep = for_repetation1(
        original_array, pks, vals)
    print("wooh 4")
    final_peaks_points4, final_valley_points4 = removing_indexes_for_all_types(
        index_to_be_removed_rep, final_peaks_points3, final_valley_points3)

    final_peaks_points5, final_valley_points5, ori_valley_points_blo, index_to_be_removed_blo = removing_blocks(
        original_array, pks, vals)
    final_peaks_points6, final_valley_points6, ori_valley_points_blo2, index_to_be_removed_blo2 = for_block1(
        original_array, pks, vals)
    # print("new blocks",index_to_be_removed_blo2)
    # print("len of blocks",len(index_to_be_removed_blo2))
    final_peaks_points8, final_valley_points8, ori_valley_points_pro3, index_to_be_removed_pro3 = for_prolongation3(
        original_array, pks, vals)

    return pks, vals, index_to_be_removed_pro3, index_to_be_removed_rep, index_to_be_removed_blo,index_to_be_removed_blo2


    # return pks, vals, index_to_be_removed2, index_to_be_removed_rep, index_to_be_removed_blo

    # else:
    #     return pks, vals, index_to_be_removed2, index_to_be_removed_rep, index_to_be_removed


minfreq = 50  # 100    #50 #my 50
maxfreq = 7500  # 5000    #7500 #my7500
bands = 10  # 10    #20 for gammatone #my 10
Q_value = 0.8  # Q-value of the oscillator, default = 0.5 = critical damping #my 0.8
center_frequency = 5  # in Hz #my 5
threshold = 0.025  # my 0.025
N_bands = 30  # theta oscillator #my 30

final_labels = []
final_feats = []
final_labels_pred = []
final_feats_pred = []
original_bound_count = 15


def get_output(wave_file, bound):

    act_pks, act_vals, pro_ind, rep_ind , blo_ind, blo_ind2= for_single_file_including_original_boundaries(
        wave_file, minfreq, maxfreq, bands, Q_value, center_frequency, threshold, N_bands, bound)
    # print("pro_ind", len(pro_ind), "rep_ind", len(rep_ind), len(act_pks), len(act_vals))
    # return pro_ind, rep_ind, act_pks, act_vals
    # prolongation, repetation, predicted boundaries
    # if(len(pro_ind) > (1.5)*len(rep_ind) ):
    k = 40
    new_pro_ind = remove_elements(pro_ind,k)
    # print(new_pro_ind,pro_ind)
    pro_ind = new_pro_ind
    # if (len(rep_ind) < 20):
    #     rep_ind_len = len(rep_ind) - 5
    #     if(len(rep_ind) <= 0):
    #         rep_ind_len = 0
    # else:
    #     rep_ind_len = len(rep_ind)

    # if(rep_ind_len < 0 ):
    #     rep_ind_len = 0
    # k1 = 10
    # new_rep_ind = remove_elements(rep_ind,k)
    # rep_ind = new_rep_ind
    d=10
    if len(rep_ind)>0: 
        new_rep_ind = remove_elements(rep_ind,d)
        # print("pro new",new_rep_ind)
        rep_ind = new_rep_ind

    blk_val=0
    temp_blk=0
    if len(blo_ind2)>0: 
        new_blo_ind2 = remove_elements(blo_ind2,d)
        # print("pro new",new_rep_ind)
        temp_blk = new_blo_ind2
    # print("newblock len",len(temp_blk))
    # print("old blk",blo_ind)
    
    if len(blo_ind2)>=14:
        blk_val=temp_blk
    else:
        blk_val=blo_ind

    # if (len(rep_ind) < 20):
    #     rep_ind_len = len(rep_ind) - 5
    #     if(len(rep_ind) <= 0):
    #         rep_ind_len = 0
    # else:
    #     rep_ind_len = len(rep_ind)

    # if(rep_ind_len < 0 ):
    #     rep_ind_len = 0
    return len(pro_ind), len(rep_ind), len(blk_val), len(act_pks)

    # return len(pro_ind), len(rep_ind), len(blo_ind), len(act_pks)

# if __name__ == "__main__":
    # get_output("/home/harsha/Downloads/1.wav")
